"use server";

import path from "path";

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
export async function getAllBanks() {
  try {
    await connectToDatabase();

    // const { params, path } = getAllBanksParams;

    const banks = await Bank.find().lean();

    return banks;
  } catch (error) {
    console.log(error);
  }
}
