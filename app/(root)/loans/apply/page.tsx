import { auth } from "@clerk/nextjs/server";
import React from "react";

import { LoanForm } from "@/components/forms/LoanForm";
import BackButton from "@/components/shared/BackButton";
import { getAllBanks } from "@/lib/actions/bank.actions";
import { getLoanType } from "@/lib/actions/loanTypes.actions";
import { getAllMembers } from "@/lib/actions/member.actions";

interface ApplyPageProps {
  searchParams: { [key: string]: string }; // Fixed index signature
}

const page = async ({ searchParams }: ApplyPageProps) => {
  const { userId } = await auth();
  const loanTypeId = searchParams.loan;

  const [members, loanType, banks] = await Promise.all([
    getAllMembers(),
    getLoanType({ loanTypeId }),
    getAllBanks({ path: "apply" }),
  ]);

  const user = members.find((member) => member.clerkId === userId);

  console.log(user);
  return (
    <div className="mx-auto pb-24">
      <div className="mb-7 flex items-center justify-between ">
        <h1 className=" mt-3  text-4xl font-semibold text-orange90">
          {loanType.name}{" "}
        </h1>
        <BackButton />
      </div>
      <LoanForm
        banks={banks}
        members={members}
        loanType={loanType}
        userId={user?._id}
      />
    </div>
  );
};

export default page;
