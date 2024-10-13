export interface CreateMemberParams {
  name: string;
  clerkId: string;
  email: string;
  username?: string | undefined;
  picture: string;
  path: string;
}

export interface UpdateMemberParams {
  clerkId: string;
  updateData: {
    name: string;
    email: string;
    username: string;
    picture: string;
  };
  path: string;
}

export interface DeleteMemberParams {
  clerkId: string;
}

export interface ApplyLoanParams {
  age: number;
  loanData: {
    member: string;
    loanType: string;
    amount: number;
    interestRate: number;
    repaymentPeriod: number;
    guarantors: string[];
    monthlyRepayment: number;
    balance: number;
  };
}
