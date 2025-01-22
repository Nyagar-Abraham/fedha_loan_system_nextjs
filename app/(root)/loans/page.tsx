import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";

import Bank from "@/components/loans/Bank";
import LoanList from "@/components/loans/LoanList";
import Popup from "@/components/shared/Popup";
import Slider from "@/components/shared/Slider";
import { IBank } from "@/database/bank.model";
import { getAllBanks } from "@/lib/actions/bank.actions";
import { getLoanTypes } from "@/lib/actions/loanTypes.actions";
import { getAllMembers } from "@/lib/actions/member.actions";
import { stringify } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Loan types",
};

const page = async ({ searchParams }: { name: string }) => {
  // const { userId } = auth();
  // const members = await getAllMembers();
  const [loanTypes, banks] = await Promise.all([getLoanTypes(), getAllBanks()]);

  return (
    <div className="mx-auto pb-24">
      <div className="mb-7 flex items-center justify-between ">
        <h1 className=" mt-3  text-4xl font-semibold text-orange90">Loans</h1>
        <Popup />
      </div>

      <LoanList loanTypesProp={stringify(loanTypes)} />

      <h2 className=" mt-16  text-4xl font-semibold text-orange70">Banks</h2>
      <Slider>
        {banks?.map((bank: IBank) => <Bank key={bank._id} bank={bank} />)}
      </Slider>
    </div>
  );
};

export default page;
