import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { LoanDetails, LoanType } from "./Interfaces";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateLoanDetails(
  loanTypes: LoanType[],
  loanValue: string,
  shares: number
): LoanDetails | null {
  // Find the loan
  const loan = loanTypes.find((loanType) => loanType.value === loanValue);

  if (!loan) {
    return null;
  }

  const maxAmountMultiplier = parseFloat(loan.maximumAmount.split("x")[0]);
  // Calculate the loan amount based on shares
  const loanAmount = maxAmountMultiplier * shares;
  // Calculate the interest per year
  const interestPerYearOnLoan = loanAmount * (loan.interestRate / 100) * 12;
  // Calculate the monthly repayment
  const totalRepayable = loanAmount + interestPerYearOnLoan;
  const monthlyRepayment = totalRepayable / (loan.repaymentPeriod * 12);

  const totalLoan = totalRepayable * loan.repaymentPeriod;
  return {
    interestPerYearOnLoan,
    monthlyRepayment,
    repaymentPeriod: loan.repaymentPeriod,
    interestRate: loan.interestRate,
    totalLoan,
  };
}
