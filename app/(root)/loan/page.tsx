import ApplyLoanForm from "@/components/forms/ApplyLoanForm";
import getAllMembers from "@/lib/actions/member.actions";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const page = async () => {
  const { userId } = auth();
  const members = await getAllMembers();

  return (
    <div className="mx-auto max-w-[50rem] ">
      <h1 className="mb-5 mt-2  text-3xl font-semibold text-orange90">
        Apply for a loan
      </h1>
      <ApplyLoanForm userId={userId!} members={members!} />
    </div>
  );
};

export default page;
