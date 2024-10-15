/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import Loans from "@/components/Dashboard/Loans";
import MemberDisplay from "@/components/Dashboard/MemberDisplay";
import Noloan from "@/components/Noloan";

import { getCurrentUser } from "@/lib/actions/member.actions";
import { auth } from "@clerk/nextjs/server";

import React from "react";

const page = async () => {
  const { userId } = auth();

  const member = await getCurrentUser({ userId });

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

        {memberLoans.length > 0 ? (
          <h1 className="mb-3 mt-9 text-3xl font-light text-orange90">
            Your loans
          </h1>
        ) : (
          <h1 className="mb-3 mt-9 text-3xl font-light text-orange90">
            Your have no loan
          </h1>
        )}

        {memberLoans.length > 0 ? <Loans loans={memberLoans} /> : <Noloan />}
      </div>
    </div>
  );
};

export default page;
