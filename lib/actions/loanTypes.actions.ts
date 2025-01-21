"use server";

import { revalidatePath } from "next/cache";

import LoanType from "@/database/loanType.model";
import Order from "@/database/orders.model";
import { CreateLoanTypeParams, LoanDragParams } from "@/types/loanType.type";

import { connectToDatabase } from "../mongoose";
import { stringify } from "../utils";

// CREATE LOAN TYPE
export async function createLoanType(loanTypeParams: CreateLoanTypeParams) {
  try {
    await connectToDatabase();

    const { params, path } = loanTypeParams;

    const loanType = await LoanType.create(params);

    // ADD ID TO ORDERARRAY IN LOCALSTORAGE
    let order = await Order.findOne();
    if (!order) {
      order = await Order.create({ loanTypeOrder: [loanType?._id.toString()] });
    } else {
      // Append the new LoanType ID to the loanTypeOrder array
      order.loanTypeOrder.push(loanType?._id.toString());
      await order.save();
    }
    revalidatePath(path);
    return stringify(loanType);
  } catch (error) {
    console.log(error);
  }
}

// GET LOAN TYPES
export async function getLoanTypes() {
  try {
    await connectToDatabase();

    // Retrieve the single Order document and populate the loanTypeOrder field
    const order = await Order.findOne().populate("loanTypeOrder");

    let loanTypes;

    if (order && order.loanTypeOrder) {
      // If order exists and loanTypeOrder is populated, use it
      loanTypes = order.loanTypeOrder;
    } else {
      // Otherwise, fetch all loan types as a fallback
      loanTypes = await LoanType.find().lean();
    }

    return loanTypes;
  } catch (error) {
    console.error("Error fetching loan types:", error);
    throw new Error("Failed to retrieve loan types");
  }
}

// GET LOAN TYPES
export async function drag(dragparams: LoanDragParams) {
  await connectToDatabase();

  const { payload, path } = dragparams;

  const order = await Order.findOne();

  if (!order) {
    throw new Error("Order document not found");
  }

  const curOrder = order?.loanTypeOrder.map((id: any) => id.toString());

  const [moverId] = curOrder.splice(payload.source.index, 1);
  curOrder.splice(payload.destination.index, 0, moverId);

  order.loanTypeOrder = curOrder.map((id: any) => id);
  await order.save();

  revalidatePath(path);
}
