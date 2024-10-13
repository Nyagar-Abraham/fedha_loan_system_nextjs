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
  [x: string]: any;
  name: string;
  clerkId: string;
  _id: unknown;
}
