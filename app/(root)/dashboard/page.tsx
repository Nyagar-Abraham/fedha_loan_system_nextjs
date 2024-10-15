/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import Loans from "@/components/Dashboard/Loans";
import MemberDisplay from "@/components/Dashboard/MemberDisplay";

import { getCurrentUser } from "@/lib/actions/member.actions";
import { auth } from "@clerk/nextjs/server";

import React from "react";

const page = async () => {
  const { userId } = auth();

  const member = await getCurrentUser({ userId });
  // console.log(member);
  // const [memberLoans] = await Promise.all([
  //   getUserLoan({ userId: member._id }),
  // ]);

  const memberLoans = member?.loans;

  return (
    <div className="flex flex-col">
      <h1 className="mb-7 mt-3  text-4xl font-semibold text-orange90">
        👋 Welcome {member?.name ? member?.name : member?.usename}
      </h1>

      <div className=" mt-8 flex size-full flex-1 flex-col  rounded-md p-3 sm:p-7">
        <MemberDisplay
          name={member?.name ? member?.name : member?.usename}
          email={member?.email}
          loanCount={member?.loans.length}
          shares={member.shares}
          avatar={member?.picture}
        />
        <h1 className="mb-3 mt-9 text-3xl font-light text-orange90">
          Your loans
        </h1>

        <Loans loans={memberLoans} />
      </div>
    </div>
  );
};

export default page;
