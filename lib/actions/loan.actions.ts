"use server";

import Member from "@/database/members.model";
import { connectToDatabase } from "../mongoose";
import { ApplyLoanParams } from "./shared.types";
import Loan from "@/database/loans.model";
import { revalidatePath } from "next/cache";

export async function applyLoan(applyLoanParams: ApplyLoanParams) {
  try {
    await connectToDatabase();

    const { age, path, loanData } = applyLoanParams;

    // create new loan
    const loan = (await Loan.create(loanData)).toObject();

    // associate loan id with user
    await Member.findByIdAndUpdate(
      loanData.member,
      {
        age,
        $addToSet: { loans: loan._id },
      },
      { new: true }
    );

    const guarantorIds = loanData.guarantors;
    const loanId = loan._id;

    await Promise.all(
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

    revalidatePath(path);
    return loan;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserLoan({
  userId,
  page,
  pageSize,
}: {
  userId: string;
  page: number;
  pageSize: number;
}) {
  try {
    await connectToDatabase();

    const skipAmount = (page - 1) * pageSize;

    const member = await Member.findOne({ clerkId: userId });

    const loans = await Loan.find({ member: member._id })
      .skip(skipAmount)
      .limit(pageSize)
      .lean();

    const totalLoans = await Loan.countDocuments({ member: member._id });

    const isNext = totalLoans > skipAmount + loans.length;

    console.log({ isNext });
    console.log({ totalLoans });
    console.log(loans.length);
    console.log({ skipAmount });

    return { loans, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// export  async function createMember(memberParams:CreateMemberParams){
//   try {
//     await connectToDatabase();

//     const {} = memberParams;

//   } catch (error) {
//     console.log(error)
//     throw error;
//   }
// };
