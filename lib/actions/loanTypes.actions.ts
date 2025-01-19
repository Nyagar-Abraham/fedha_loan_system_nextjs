"use server";

import LoanType from "@/database/loanType.model";
import { CreateLoanTypeParams } from "@/types/loanType.type";

import { connectToDatabase } from "../mongoose";

export async function createLoanType(loanType: CreateLoanTypeParams) {
  await connectToDatabase();

  const loantype = await LoanType.create(loanType);

  return loantype;
}
