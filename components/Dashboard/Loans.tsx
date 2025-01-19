/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";

import { cn, formatToCurrency } from "@/lib/utils";

const Loans = ({ loans }: { loans: any }) => {
  return (
    <div className="grid  gap-4 max-md:gap-y-7 md:grid-cols-2  md:gap-x-6 md:gap-y-8">
      {loans.map((loan: any) => (
        <Link
          href={`/payloan/${loan._id}`}
          className={cn(
            "border-t-4 px-3 hover:scale-105 hover:translate-y-2 transition-transform duration-300 shadow-md dark:shadow-xl rounded-md py-4",
            {
              "border-green60 text-green60": loan.loanType === "Short",
              "border-orange60 text-orange60": loan.loanType === "Emergency",
              "border-indigo-600 text-indigo-600": loan.loanType === "Normal",
              "border-rose-600 text-rose-600": loan.loanType === "Development",
            }
          )}
          key={loan._id}
        >
          <p
            className={cn(
              "text-sm mt-2 text-center tracking-wider uppercase",
              {}
            )}
          >
            {loan.loanType}
          </p>
          <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-6">
            <Badge
              item={loan.balance}
              itemName="Balance"
              loanType={loan.loanType}
            />
            <Badge
              item={loan.interestRate}
              itemName="Interest Rate"
              loanType={loan.loanType}
            />
            <Badge
              item={loan.monthlyRepayment}
              itemName="Monthly Repay"
              loanType={loan.loanType}
            />
            <Badge
              item={loan.status}
              itemName="Status"
              loanType={loan.loanType}
            />
          </div>
        </Link>
      ))}
    </div>
  );
};

function Badge({
  item,
  itemName,
  loanType,
}: {
  item: number | string;
  itemName: string;
  loanType: string;
}) {
  return (
    <div
      className={cn("flex  items-center gap-2 rounded-full  px-6 py-1", {
        "border border-green30/80 dark:text-green10 text-green60":
          loanType === "Short",
        "border border-orange30/80 dark:text-orange10 text-orange60":
          loanType === "Emergency",
        "border border-indigo-300/80 dark:text-indigo-100 text-indigo-600":
          loanType === "Normal",
        "border border-rose-300/80 dark:text-rose-100 text-rose-600":
          loanType === "Development",
      })}
    >
      <span className="text-base font-semibold">{itemName}</span>
      <span className="text-xl font-bold ">
        {itemName !== "interest Rate" && itemName !== "Status"
          ? // @ts-expect-error
            formatToCurrency(item)
          : item}
      </span>
    </div>
  );
}
export default Loans;
