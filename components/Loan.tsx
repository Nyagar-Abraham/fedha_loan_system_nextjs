"use client";

import Image from "next/image";
import { Dispatch } from "react";
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { loanTypeInterface } from "@/lib/Interfaces";
import { cn } from "@/lib/utils";

interface LoanProps {
  loan: loanTypeInterface;
  index: number;
  isOpen: string;
  setIsOpen: Dispatch<React.SetStateAction<string>>;
}

const Loan = ({ loan, index, isOpen, setIsOpen }: LoanProps) => {
  return (
    <Draggable draggableId={loan.id} index={index}>
      {(Provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <Dialog>
          <DialogTrigger>
            <li
              ref={Provided.innerRef}
              {...Provided.draggableProps}
              {...Provided.dragHandleProps}
              className={cn(
                "relative flex text-start  flex-col bg-dark90-light20 gap-4 rounded-sm border border-orange10/30 px-3 py-5 text-orange20 duration-300 hover:scale-[1.01] hover:border-orange40/30",
                { "border-orange30/30": snapshot.isDragging }
              )}
            >
              {loan.isRecommended && (
                <p className="absolute left-2 top-0 -translate-y-1/2 rounded-full bg-orange80 px-3 py-1 font-semibold uppercase tracking-wide">
                  recommended
                </p>
              )}

              {/* FIXED: Used `fixed` instead of `absolute` to position the overlay relative to the viewport. */}
              {/* {isOpen === loan.bank && (
                <div
                  onClick={() => setIsOpen("")}
                  className="fixed inset-0 z-[100] flex items-center justify-center bg-black opacity-50 backdrop-blur-lg"
                >
                  <div className="relative z-[110] size-64 opacity-100">
                    <Image
                      src={loan.logo.src}
                      alt={`${loan.category} logo`}
                      className="z-[60] aspect-square object-cover duration-300"
                      fill
                    />
                  </div>
                </div>
              )} */}

              <div className="flex-between ">
                <div>
                  <p className="text-[1.2rem] font-bold">
                    {loan.repaymentPeriod} year {loan.category}
                  </p>
                  <p className="text-[0.8rem] text-orange10/60">{loan.bank}</p>
                </div>
                {/* FIXED: Ensured `onClick` toggles the modal while maintaining proper image behavior */}
                <Image
                  src={loan.logo.src}
                  alt={`${loan.category} logo`}
                  className="aspect-square rounded-sm object-cover duration-300 hover:scale-[1.01] hover:opacity-60"
                  width={50}
                  height={50}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(loan.bank);
                  }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 rounded-sm border border-orange10/10 p-2 ">
                <div className="flex flex-col">
                  <p className="text-[0.8rem] capitalize text-orange10/60">
                    max amount
                  </p>
                  <p className="font-bold">{loan.maximumAmount}</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-[0.8rem] capitalize text-orange10/60">
                    monthly installement
                  </p>
                  <p className="font-bold">{loan.monthlyInstallement}</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-[0.8rem] capitalize text-orange10/60">
                    Rate
                  </p>
                  <p className="font-bold">
                    {(loan.interestRate * 100).toFixed(2)}%
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="text-[0.8rem] capitalize text-orange10/60">
                    Duration
                  </p>
                  <p className="font-bold">
                    {loan.repaymentPeriod}{" "}
                    {loan.repaymentPeriod === 1 ? "year" : "years"}
                  </p>
                </div>
              </div>
            </li>
          </DialogTrigger>
          <DialogContent className="mt-7">
            <p>p</p>
          </DialogContent>
        </Dialog>
      )}
    </Draggable>
  );
};

export default Loan;
