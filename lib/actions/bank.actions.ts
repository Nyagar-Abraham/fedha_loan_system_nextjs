"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import Bank from "@/database/bank.model";
import { CreateBankParams, UpdateBankParams } from "@/types/bank.type";

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

// UPDATE LOAN TYPE
export async function updateBank(bankParams: UpdateBankParams) {
  try {
    await connectToDatabase();

    const { params, path, bankId } = bankParams;

    const bankDocument = await Bank.findByIdAndUpdate(bankId, params, {
      new: true,
    });

    if (!bankDocument) {
      throw new Error(`Bank with ID ${bankId} not found`);
    }

    const bank = bankDocument.toObject();

    revalidatePath(path);
    // redirect(path);

    console.log("finished");
    return bank;
  } catch (error) {
    console.error("Error updating bank:", error);
    throw new Error("Failed to update bank");
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
    } else if (path && path === "apply") {
      banks = await Bank.find().select("name").lean();
    } else {
      banks = await Bank.find().lean();
    }

    return banks;
  } catch (error) {
    console.log(error);
  }
}

// GET  BANK
export async function getBank({ bankId }: { bankId?: string }) {
  try {
    await connectToDatabase();

    const bankDocument = await Bank.findById(bankId);
    const bank = bankDocument.toObject();

    return bank;
  } catch (error) {
    console.log(error);
  }
}

// DELETE BANKS
export async function deleteBanks({
  bankIds = [],
  path,
}: {
  bankIds?: string[];
  path: string;
}) {
  try {
    await connectToDatabase();

    const deletedBanks = await Promise.all(
      bankIds.map((bankId) => Bank.findByIdAndDelete(bankId).lean())
    );

    revalidatePath(path);

    return deletedBanks.filter(Boolean); // Filter out null results
  } catch (error) {
    console.error("Error deleting banks:", error);
    throw new Error("Failed to delete banks");
  }
}
