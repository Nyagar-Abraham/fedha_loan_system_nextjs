"use server";

import { revalidatePath } from "next/cache";

import Bank from "@/database/bank.model";
import { CreateBankParams } from "@/types/bank.type";

import { connectToDatabase } from "../mongoose";

// CREATE LOAN TYPE
export async function createBank(bankParams: CreateBankParams) {
  try {
    await connectToDatabase();

    const { params, path } = bankParams;

    const bankDocument = await Bank.create(params);
    const bank = bankDocument.toObject();

    revalidatePath(path);
    return bank;
  } catch (error) {
    console.log(error);
  }
}

// GET ALL BANKS
export async function getAllBanks({ path }: { path?: string }) {
  try {
    await connectToDatabase();

    let banks;

    if (path && path === "admin") {
      banks = await Bank.find()
        .select("name branchCode headquarters email  contactEmail ")
        .lean();
    } else {
      banks = await Bank.find().lean();
    }

    return banks;
  } catch (error) {
    console.log(error);
  }
}
