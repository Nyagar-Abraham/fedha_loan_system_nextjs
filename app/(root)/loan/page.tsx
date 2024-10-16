import ApplyLoanForm from "@/components/forms/ApplyLoanForm";
import { getAllMembers } from "@/lib/actions/member.actions";

import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import React from "react";

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

      <ApplyLoanForm
        userId={userId!}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        members={members}
      />
    </div>
  );
};

export default page;
