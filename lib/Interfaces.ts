export interface navRoutesInterface {
  route: string;
  href: string;
}

export interface loanTypeInterface {
  category: string;
  value: string;
  maximumAmount: string;
  interestRate: number;
  repaymentPeriod: number;
}

export interface MemberInterface {
  [x: string]: unknown;
  name: string;
  clerkId: string;
  _id: string;
  shares: number;
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
