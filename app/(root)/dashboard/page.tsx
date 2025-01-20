/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";

import Loans from "@/components/Dashboard/Loans";
import MemberDisplay from "@/components/Dashboard/MemberDisplay";
import Noloan from "@/components/loans/Noloan";
import Pagination from "@/components/shared/Pagination";
import Popup from "@/components/shared/Popup";
import { getUserLoan } from "@/lib/actions/loan.actions";
import { getCurrentUser } from "@/lib/actions/member.actions";

export const metadata: Metadata = {
  title: "Dashboard",
};

const page = async ({ searchParams }: never) => {
  const { userId } = auth();

  const [member, { loans, isNext }] = await Promise.all([
    getCurrentUser({
      userId,
    }),
    getUserLoan({
      userId,
      page: searchParams?.page ? +searchParams.page : 1,
      pageSize: 4,
    }),
  ]);

  const noticeExist = !!member?.exitNoticeDate;

  return (
    <div className="flex flex-col">
      <div className="flex-between mb-7 mt-3">
        <h1 className=" text-4xl font-semibold text-orange90">
          👋 Welcome{" "}
          {member?.name
            ? member?.name.split("-")[0].toString()
            : member?.usename}
        </h1>
        <Popup noticeExist={noticeExist} />
      </div>

      <div className=" mt-8 flex size-full flex-1 flex-col  rounded-md p-3 sm:p-7">
        <MemberDisplay
          name={member?.name ? member?.name : member?.usename}
          email={member?.email}
          loanCount={member?.loans.length}
          shares={member.shares}
          avatar={member?.picture}
        />

        {loans.length > 0 ? (
          <h1 className="mb-3 mt-9 text-3xl font-light text-orange90">
            Your loans
          </h1>
        ) : (
          <h1 className="mb-3 mt-9 text-3xl font-light text-orange90">
            Your have no loan
          </h1>
        )}

        {loans.length > 0 ? <Loans loans={loans} /> : <Noloan />}

        <div className=" flex-center  mt-12   py-6 ">
          <Pagination
            isNext={isNext}
            pageNumber={searchParams?.page ? +searchParams.page : 1}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
