"use server";

import { revalidatePath } from "next/cache";

import LoanType from "@/database/loanType.model";
import Order from "@/database/orders.model";
import {
  CreateLoanTypeParams,
  LoanDragParams,
  UpdateLoanTypeParams,
} from "@/types/loanType.type";

import { connectToDatabase } from "../mongoose";

// CREATE LOAN TYPE
export async function createLoanType(loanTypeParams: CreateLoanTypeParams) {
  try {
    await connectToDatabase();

    const { params, path } = loanTypeParams;

    const loanTypeDocument = await LoanType.create(params);
    const loanType = loanTypeDocument.toObject();

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
    return loanType;
  } catch (error) {
    console.log(error);
  }
}

// Edit LOAN TYPE
export async function updateLoanType(loanTypeParams: UpdateLoanTypeParams) {
  try {
    await connectToDatabase();

    const { params, path, loanTypeId } = loanTypeParams;

    const loanTypeDocument = await LoanType.findByIdAndUpdate(
      loanTypeId,
      params,
      { new: true }
    );
    const loanType = loanTypeDocument.toObject();

    revalidatePath(path);
    return loanType;
  } catch (error) {
    console.log(error);
  }
}

// GET  LOANTYPE
export async function getLoanType({ loanTypeId }: { loanTypeId?: string }) {
  try {
    await connectToDatabase();

    const loanTypeDocument = await LoanType.findById(loanTypeId);
    const loanType = loanTypeDocument.toObject();

    return loanType;
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
    const OrderObj = await Order.findOne();
    const orderChange = OrderObj?.loanTypeOrder?.toString();

    let loanTypes;

    if (order && order.loanTypeOrder) {
      // If order exists and loanTypeOrder is populated, use it
      loanTypes = order.loanTypeOrder;
    } else {
      // Otherwise, fetch all loan types as a fallback
      const loanTypeDocs = await LoanType.find();
      loanTypes = loanTypeDocs.map((doc) => doc.toObject());
    }

    return { loanTypes, orderChange };
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

// GET All LoanTypes
export async function getLoanTypesAdmin() {
  try {
    await connectToDatabase();

    const loanTypesDocuments = await LoanType.find().select(
      "name intrestRate maxLoanAmount loanProcessingFee repaymentPeriod collateralRequired"
    );

    // Convert each document to a plain JavaScript object
    const loanTypes = loanTypesDocuments.map((doc) => doc.toObject());

    return loanTypes;
  } catch (error) {
    console.error("Error fetching loan types:", error);
    throw new Error("Failed to fetch loan types");
  }
}

// DELETE LOANTYPES
export async function deleteLoanTypes({
  loanTypeIds = [],
  path,
}: {
  loanTypeIds?: string[];
  path: string;
}) {
  try {
    await connectToDatabase();

    const deletedLoanTypes = [];

    for (const loanTypeId of loanTypeIds) {
      const loanTypeDoc = await LoanType.findByIdAndDelete(loanTypeId);
      if (loanTypeDoc) {
        const loanType = loanTypeDoc.toObject();

        const order = await Order.findOne();
        if (order) {
          await Order.findByIdAndUpdate(order._id, {
            $pull: { loanTypeOrder: loanType._id },
          });
        }

        deletedLoanTypes.push(loanType);
      }
    }

    // Revalidate the path after all deletions
    revalidatePath(path);

    return deletedLoanTypes;
  } catch (error) {
    console.error("Error deleting loanTypes:", error);
    throw new Error("Failed to delete loanTypes");
  }
}
