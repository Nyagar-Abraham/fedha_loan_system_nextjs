"use server";

import Member from "@/database/members.model";
import { connectToDatabase } from "../mongoose";
import { ApplyLoanParams } from "./shared.types";
import Loan from "@/database/loans.model";

export default async function applyLoan(applyLoanParams: ApplyLoanParams) {
  try {
    await connectToDatabase();

    const { age, loanData } = applyLoanParams;

    // create new loan
    const loan = (await Loan.create(loanData)).toObject();

    console.log({ loan });

    // associate loan id with user
    const member = await Member.findByIdAndUpdate(
      loanData.member,
      {
        age,
        $addToSet: { loans: loan._id },
      },
      { new: true }
    );

    console.log({ member });

    const guarantorIds = loanData.guarantors;
    const loanId = loan._id;

    const updateGuarantors = await Promise.all(
      guarantorIds.map(async (guarantorId) => {
        return await Member.findByIdAndUpdate(
          guarantorId,
          {
            $addToSet: { guarantorFor: loanId }, // Assuming 'guarantorFor' is the field in the Member schema
          },
          { new: true }
        );
      })
    );

    console.log({ updateGuarantors });

    console.log("DONE");

    return loan;
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
