"use client";

import { ArrowRight, EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";

import { ILoanType } from "@/database/loanType.model";
import { cn } from "@/lib/utils";

import { Button } from "../ui/button";

interface LoanProps {
  loan: ILoanType;
  index: number;
}

const Loan = ({ loan, index }: LoanProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [clicked, setClicked] = useState(false);
  const pathname = usePathname();

  // const router = useRouter();
  // const searchParams = useSearchParams();

  // const handleClick = (value: string) => {
  //   if (searchParams.get("name") === value) {
  //     const newUrl = removeKeysFromQuery({
  //       params: searchParams.toString(),
  //       keysToRemove: ["name"],
  //     });

  //     router.push(newUrl, { scroll: false });
  //   } else {
  //     const newUrl = formUrlQuery({
  //       params: searchParams.toString(),
  //       key: "name",
  //       value,
  //     });

  //     router.push(newUrl, { scroll: false });
  //   }
  // };

  return (
    <Draggable draggableId={loan?._id?.toString()} index={index}>
      {(Provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <Link
          href={`${pathname}/${loan._id}`}
          // onClick={() => handleClick(loan.id)}
          ref={Provided.innerRef}
          {...Provided.draggableProps}
          {...Provided.dragHandleProps}
          className={cn(
            "relative flex text-start shadow-md  flex-col bg-dark90-light20 gap-4 rounded-sm border border-orange20/30 dark:border-orange10/30 px-3 py-5 dark:!text-orange20 !text-orange-950/80 duration-300 hover:scale-[1.01] hover:border-orange40/30",
            { "border-orange30/30": snapshot.isDragging }
          )}
        >
          {loan?.collateralRequired && (
            <p className="absolute left-2 top-0 -translate-y-1/2 rounded-full border border-orange80/80 px-3 py-1 font-semibold uppercase tracking-wide text-orange80/80 backdrop-blur-md ">
              collateral required
            </p>
          )}

          <div className="flex-between ">
            <div>
              <p className="text-[1.2rem] font-bold">{loan?.name}</p>
            </div>

            {/* <Image
              src={loan?.logo.src}
              alt={`${loan?.category} logo`}
              className="aspect-square rounded-sm object-cover duration-300 hover:scale-[1.01] hover:opacity-60"
              width={50}
              height={50}
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(loan?.bank);
              }}
            /> */}
          </div>
          <div className=" rounded-sm border border-orange10/10 p-2 ">
            <div className="grid grid-cols-2 gap-4">
              <Attribute label="intrest rate" value={loan?.intrestRate} />
              <Attribute label="maximum amount" value={loan?.maxLoanAmount} />
              <Attribute
                label="processing fee"
                value={loan?.loanProcessingFee}
              />
              <Attribute
                label="repayment period"
                value={loan?.repaymentPeriod}
              />
            </div>
            <div
              className={cn(
                `flex flex-col gap-2 rounded-sm transition-all duration-500    mt-3 ${isOpen && "bg-dark80-light30 duration-500"}`
              )}
            >
              <Button
                onClick={() => {
                  if (isOpen) {
                    setClicked(true);
                  }

                  if (!isOpen && !clicked) {
                    setIsOpen((cur) => !cur);
                    setClicked(true);
                  }

                  if (isOpen && clicked) {
                    setClicked(false);
                    setIsOpen((cur) => !cur);
                  }
                }}
                onMouseEnter={() => {
                  if (!clicked) setIsOpen(true);
                }}
                onMouseLeave={() => {
                  if (!clicked) setIsOpen(false);
                }}
                className={cn(
                  `bg-dark80-light30 hover:bg-dark80-light30  space-x-3 capitalize duration-500 !text-base ${
                    isOpen && "!text-orange70 duration-500"
                  }`
                )}
              >
                <EyeIcon className="size-5 " />
                <span>view eligibility criteria</span>
              </Button>

              {isOpen && (
                <>
                  <div className="h-[2px] bg-orange70 duration-500" />
                  {loan.eligibilityCriteria?.map((criteria) => (
                    <p
                      key={criteria}
                      className=" flex items-center gap-1 px-1 "
                    >
                      <ArrowRight className="size-3" />
                      <span className="line-clamp-1">{criteria}</span>
                    </p>
                  ))}{" "}
                </>
              )}
            </div>
          </div>
        </Link>
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
      <p className="font-bold ">{value}</p>
    </div>
  );
}

export default Loan;
