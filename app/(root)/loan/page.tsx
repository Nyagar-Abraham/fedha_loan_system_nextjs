import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import React from "react";

import ApplyLoanForm from "@/components/forms/ApplyLoanForm";
import Loan from "@/components/Loan";
import { loanTypes } from "@/constants";
import { getAllMembers } from "@/lib/actions/member.actions";
import { loanTypeInterface } from "@/lib/Interfaces";

export const metadata: Metadata = {
  title: "Apply loan",
};

const page = async () => {
  const { userId } = auth();
  const members = await getAllMembers();

  return (
    <div className="mx-auto max-w-[50rem] ">
      <h1 className="mb-7 mt-3  text-4xl font-semibold text-orange90">
        Apply for a loan
      </h1>

      <ul className="grid gap-4 md:grid-cols-2 md:gap-y-6 lg:gap-6">
        {loanTypes.map((loan: loanTypeInterface) => (
          <Loan key={loan.value} loan={loan} />
        ))}
      </ul>

      {/* <ApplyLoanForm
        userId={userId!}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        members={members}
      /> */}
    </div>
  );
};

export default page;
