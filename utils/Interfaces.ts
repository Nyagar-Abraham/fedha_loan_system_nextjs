import { StaticImageData } from "next/image";
import { DraggableLocation } from "react-beautiful-dnd";

export interface navRoutesInterface {
  route: string;
  href: string;
}

export interface loanTypeInterface {
  id: string;
  category: string;
  value: string;
  maximumAmount: string;
  interestRate: number;
  repaymentPeriod: number;
  monthlyInstallement: string;
  bank: string;
  logo: StaticImageData;
  isRecommended: boolean;
}

export interface BankInterface {
  name: string;
  logo: string;
}

export interface MemberInterface {
  [x: string]: unknown;
  name: string;
  clerkId: string;
  _id: string;
  shares: number;
}

export interface ContributiontypesInterface {
  type: string;
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

type onDragPayload = {
  source: DraggableLocation;
  destination: DraggableLocation;
};

export type LoanAction =
  | { type: "SET_LOANS"; payload: LoanBoard }
  | { type: "MOVE_LOAN"; payload: onDragPayload };
