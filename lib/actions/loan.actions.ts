"use server";

import { connectToDatabase } from "../mongoose";
import { ApplyLoanParams } from "./shared.types";

export default async function applyLoan(applyLoanParams: ApplyLoanParams) {
  try {
    await connectToDatabase();

    console.log("RECEIVED");
    console.log(applyLoanParams);
    return { id: "1" };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// export default async function createMember(memberParams:CreateMemberParams){
//   try {
//     await connectToDatabase();

//     const {} = memberParams;

//   } catch (error) {
//     console.log(error)
//     throw error;
//   }
// };
