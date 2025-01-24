import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export interface navRoutesInterface {
  route: string;
  href: string;
  icon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
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

export type LoanDetails = {
  interestPerYearOnLoan: number;
  monthlyRepayment: number;
  repaymentPeriod: number;
  interestRate: number;
  totalLoan: number;
};

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export interface LoanType {
  name: string;
  intrestRate: number;
  maxLoanAmount: number;
  repaymentPeriod: string;
  eligibilityCriteria?: string[];
  loanProcessingFee: number;
  downPayment?: number;
  vehicleType?: string;
  propertyType?: string;
  moratoriumPeriod?: string;
  collateralRequired?: boolean;
  businesstype?: string;
}

export interface BankType {
  name: string;
  branchCode: string;
  headquarters: string;
  contactEmail: string;
}

// export type LoanBoard = {
//   loans: loanTypeInterface[];
//   order: string[];
// };

// export type LoanAction =
//   | { type: "SET_LOANS"; payload: LoanBoard }
//   | { type: "MOVE_LOAN"; payload: onDragPayload };
