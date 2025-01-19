import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";

import ApplyLoanForm from "@/components/forms/ApplyLoanForm";
import LoanList from "@/components/loans/LoanList";
import Popup from "@/components/Popup";
import { LoanProvider } from "@/context/LoanContext";
import { getAllMembers } from "@/lib/actions/member.actions";
import { stringify } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Apply loan",
};

const page = async ({ searchParams }: { name: string }) => {
  const { userId } = auth();
  const members = await getAllMembers();
  const { name } = searchParams;

  return (
    <div className="mx-auto  ">
      <div className="mb-7 flex items-center justify-between ">
        <h1 className=" mt-3  text-4xl font-semibold text-orange90">Loans</h1>
        <Popup />
      </div>

      <LoanProvider>
        <LoanList />
      </LoanProvider>

      {name && (
        <div className="bg-dark100-light10 mt-8 rounded-sm px-3 pb-8 pt-4">
          <h2 className=" mb-6  mt-3 text-3xl font-semibold capitalize text-orange90">
            Apply {name} loan
          </h2>

          <ApplyLoanForm userId={userId!} membersString={stringify(members)} />
        </div>
      )}
    </div>
  );
};

export default page;
