import { clsx, type ClassValue } from "clsx";
import queryString from "query-string";
import { twMerge } from "tailwind-merge";

import { LoanDetails, LoanType } from "../types/Interfaces";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const arrayBufferToString = (buffer: ArrayBuffer) => {
  const decoder = new TextDecoder("utf-8");
  return decoder.decode(buffer);
};

export const stringToArrayBuffer = (str: string) => {
  const encoder = new TextEncoder();
  return encoder.encode(str).buffer;
};

export function addPercentageSign(value: number): string {
  return `${value}%`;
}

export function addShillingSign(value: number): string {
  return `KSh ${value.toLocaleString()}`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const stringify = (value: any) => JSON.stringify(value);

export const parse = (value: string) => JSON.parse(value);

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

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

export function formatToCurrency(amount: number): string {
  return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

interface UrlQueryParams {
  params: string;
  key: string;
  value: string | null;
  extendedPath?: string;
}

export const formUrlQuery = ({
  params,
  key,
  value,
  extendedPath,
}: UrlQueryParams) => {
  const currentUrl = queryString.parse(params);

  currentUrl[key] = value;

  return queryString.stringifyUrl(
    {
      url: `${window.location.pathname}${extendedPath && extendedPath}`,
      query: currentUrl,
    },
    { skipNull: true }
  );
};

interface RemoveUrlQueryParams {
  params: string;
  keysToRemove: string[];
}

export const removeKeysFromQuery = ({
  params,
  keysToRemove,
}: RemoveUrlQueryParams) => {
  const currentUrl = queryString.parse(params);

  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  return queryString.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};
