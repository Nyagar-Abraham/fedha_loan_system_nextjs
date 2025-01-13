"use client";

import Image from "next/image";
import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { loanTypeInterface } from "@/lib/Interfaces";

const Loan = ({ loan }: { loan: loanTypeInterface }) => {
  const [isOpen, setIsOpen] = useState<string>("");

  return (
    <Dialog>
      <DialogTrigger>
        <li className="relative flex flex-col gap-4 rounded-sm border border-orange10/30 px-3 py-5 text-orange20 duration-300 hover:scale-[1.01] hover:border-orange40/30">
          {loan.value === "Development" && (
            <p className="absolute left-2 top-0 -translate-y-1/2 rounded-full bg-orange80 px-3 py-1 font-semibold uppercase tracking-wide">
              recommended
            </p>
          )}

          {/* FIXED: Used `fixed` instead of `absolute` to position the overlay relative to the viewport. */}
          {/* {isOpen === loan.bank && (
         <div
            onClick={() => setIsOpen('')}
            className="flex items-center justify-center inset-0  fixed z-50 bg-black backdrop-blur-lg opacity-50"
         >
            <div className="h-64 w-64 relative opacity-100">
               <Image
               src={loan.logo.src}
               alt={`${loan.category} logo`}
               className="aspect-square object-cover z-[60] duration-300"
               fill
               />
            </div>
         </div>
         )} */}

          <div className="flex-between">
            <div>
              <p className="text-[1.2rem] font-bold">
                <span>{loan.repaymentPeriod}</span> year {loan.category}
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
              onClick={() => setIsOpen(loan.bank)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 rounded-sm border border-orange10/10 p-2">
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
              <p className="text-[0.8rem] capitalize text-orange10/60">Rate</p>
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
  );
};

export default Loan;
