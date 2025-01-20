import { StaticImageData } from "next/image";
import { DraggableLocation } from "react-beautiful-dnd";

export interface navRoutesInterface {
  route: string;
  href: string;
}

export interface MemberInterface {
  [x: string]: unknown;
  name: string;
  clerkId: string;
  _id: string;
  shares: number;
}

export interface ContributiontypesInterface {
  value: string;
  label: string;
}

export type LoanType = {
  category: string;
  value: string;
  maximumAmount: string;
  interestRate: number;
  repaymentPeriod: number;
};

export type LoanDetails = {
  interestPerYearOnLoan: number;
  monthlyRepayment: number;
  repaymentPeriod: number;
  interestRate: number;
  totalLoan: number;
};

export type LoanBoard = {
  loans: loanTypeInterface[];
  order: string[];
};

// export type LoanAction =
//   | { type: "SET_LOANS"; payload: LoanBoard }
//   | { type: "MOVE_LOAN"; payload: onDragPayload };
