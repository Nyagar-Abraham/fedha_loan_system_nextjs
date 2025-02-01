/* eslint-disable no-unused-vars */
"use client";

import { ArrowRight, EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";

import { ILoanType } from "@/database/loanType.model";
import {
  addPercentageSign,
  addShillingSign,
  cn,
  formUrlQuery,
} from "@/lib/utils";

import List from "../shared/List";

interface LoanProps {
  loan: ILoanType;
  index: number;
}

enum Labels {
  INTERESTRATE = "intrest rate",
  MAXIMUMAMOUNT = "maximum amount",
  PROCESSINGFEE = "processing fee",
  REPAYMENTPERIOD = "repayment period",
}

const Loan = ({ loan, index }: LoanProps) => {
  // const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = () => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "loan",
      value: loan._id as string,
      extendedPath: "/apply",
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <Draggable draggableId={loan?._id?.toString()} index={index}>
      {(Provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <li
          onClick={handleClick}
          ref={Provided.innerRef}
          {...Provided.draggableProps}
          {...Provided.dragHandleProps}
          className={cn(
            "relative flex text-start shadow-md  flex-col bg-dark90-light20 gap-4 rounded-sm border border-orange20/30 dark:border-orange10/30 px-3 py-5 dark:!text-orange20 !text-orange-950/80 duration-300 hover:scale-[1.01] hover:border-orange40/30",
            { "border-orange30/30": snapshot.isDragging }
          )}
        >
          <p className="absolute left-2 top-0 -translate-y-1/2 rounded-full border border-orange80/80 px-3 py-1 font-semibold uppercase tracking-wide text-orange80/80 backdrop-blur-md ">
            {loan.collateralRequired ? "secured" : "unsecured"}
          </p>

          <div className="flex-between ">
            <div>
              <p className="text-[1rem] uppercase tracking-wide text-orange-950 dark:text-orange30">
                {loan?.name}
              </p>
            </div>
          </div>
          <div className=" rounded-sm border border-orange10/10 p-2 ">
            <div className="grid grid-cols-2 gap-4">
              <Attribute
                label={Labels.INTERESTRATE}
                value={loan?.intrestRate}
              />
              <Attribute
                label={Labels.MAXIMUMAMOUNT}
                value={loan?.maxLoanAmount}
              />
              <Attribute
                label={Labels.PROCESSINGFEE}
                value={loan?.loanProcessingFee}
              />
              <Attribute
                label={Labels.REPAYMENTPERIOD}
                value={loan?.repaymentPeriod}
              />
            </div>{" "}
            <List
              heading="eligibility criteria"
              listItems={loan?.eligibilityCriteria}
            />
          </div>
        </li>
      )}
    </Draggable>
  );
};

function Attribute({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex flex-col">
      <p className="text-[0.8rem] capitalize  text-orange-950/70 dark:text-orange10/50 ">
        {label}
      </p>
      <p className="font-bold ">
        {typeof value === "string"
          ? value
          : Labels.INTERESTRATE === label
            ? addPercentageSign(value)
            : addShillingSign(value)}
      </p>
    </div>
  );
}

export default Loan;
