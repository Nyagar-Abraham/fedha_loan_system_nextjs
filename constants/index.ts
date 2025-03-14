/* eslint-disable no-unused-vars */
import { LayoutDashboard, DollarSign, User } from "lucide-react";

import { Payment } from "@/types/Interfaces";

export const NavRoutes = [
  {
    route: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    route: "Loans",
    href: "/loans",
    icon: DollarSign,
  },
  {
    route: "Admin",
    href: "/admin",
    icon: User,
  },
];

export const payments: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
];

export enum Routes {
  LOANS = "/loans",
  DASHBOARD = "/dashboard",
  ADMIN = "/admin",
}

export const themes = [
  {
    theme: "light",
    name: "Light",
  },
  {
    theme: "dark",
    name: "Dark",
  },
  {
    theme: "system",
    name: "System",
  },
];

export const contributiontypes = [
  { Value: "normal", label: "Normal Deposit" },
  { value: "fixed", label: "Fixed Deposit" },
];

export const LoanName = [
  {
    value: "Personal Loan",
    label: "Personal Loan",
  },
  {
    value: "Mortgage Loan",
    label: "Mortgage Loan",
  },
  {
    value: "Car Loan",
    label: "Car Loan",
  },
  {
    value: "Education Loan",
    label: "Education Loan",
  },
  {
    value: "Business Loan",
    label: "Business Loan",
  },
];

export const vehicleType = [
  {
    value: "Sedans",
    label: "Sedans",
  },
  {
    value: "SUVs",
    label: "SUVs",
  },
  {
    value: "Trucks",
    label: "Trucks",
  },
  {
    value: "Motorbikes",
    label: "Motorbikes",
  },
];

export const propertyType = [
  {
    value: "Residential and commercial properties",
    label: "Residential and commercial properties",
  },
];

export const businessType = [
  {
    value: "Small and Medium Enterprises (SMEs)",
    label: "Small and Medium Enterprises (SMEs)",
  },
];

export const moratoriumPeriods = [
  {
    value: "6 months after graduation",
    label: "6 months after graduation",
  },
  {
    value: "12 months after graduation",
    label: "12 months after graduation",
  },
  {
    value: "18 months after graduation",
    label: "18 months after graduation",
  },
  {
    value: "24 months after graduation",
    label: "24 months after graduation",
  },
];

export const BankName = [
  {
    value: "Kenya Commercial Bank",
    label: "Kenya Commercial Bank",
  },
  {
    value: "Equity Bank",
    label: "Equity Bank",
  },
  {
    value: "Co-operative Bank of Kenya",
    label: "Co-operative Bank of Kenya",
  },
  {
    value: "Absa Bank Kenya",
    label: "Absa Bank Kenya",
  },
  {
    value: "Standard Chartered Bank Kenya",
    label: "Standard Chartered Bank Kenya",
  },
];

const types = [
  {
    name: "Personal Loan",
    intrestRate: 13.5,
    maxLoanAmount: 2000000,
    repaymentPeriod: "5 years",
    eligibilityCriteria: [
      "Minimum monthly income of KES 50,000",
      "No existing defaulted loans",
    ],
    loanProcessingFee: 10000,
    loanPurpose: "General personal expenses",
  },
  {
    name: "Car Loan",
    intrestRate: 9.5,
    maxLoanAmount: 5000000,
    repaymentPeriod: "7 years",
    eligibilityCriteria: [
      "Employed for at least 2 years",
      "Valid driver's license",
    ],
    loanProcessingFee: 15000,
    downPayment: 20,
    vehicleType: "Sedans, SUVs, Trucks",
  },
  {
    name: "Mortgage Loan",
    intrestRate: 8.0,
    maxLoanAmount: 20000000,
    repaymentPeriod: "15 years",
    eligibilityCriteria: [
      "Minimum monthly income of KES 100,000",
      "Proof of stable employment",
    ],
    loanProcessingFee: 50000,
    propertyType: "Residential and commercial properties",
    downPayment: 10,
  },
  {
    name: "Education Loan",
    intrestRate: 7.0,
    maxLoanAmount: 1000000,
    repaymentPeriod: "10 years",
    eligibilityCriteria: ["Admission letter from a recognized institution"],
    loanProcessingFee: 5000,
    moratoriumPeriod: "18 months after graduation",
    loanPurpose: "Tuition and educational expenses",
  },
  {
    name: "Business Loan",
    intrestRate: 15.0,
    maxLoanAmount: 10000000,
    repaymentPeriod: "10 years",
    eligibilityCriteria: [
      "Business registration certificate",
      "Proof of profitability for the last 3 years",
    ],
    loanProcessingFee: 30000,
    collateralRequired: true,
    businesstype: "Small and Medium Enterprises (SMEs)",
    loanPurpose: "Business expansion, equipment purchase",
  },
  {
    name: "Agricultural Loan",
    intrestRate: 10.0,
    maxLoanAmount: 5000000,
    repaymentPeriod: "5 years",
    eligibilityCriteria: ["Certified farmer", "Ownership of agricultural land"],
    loanProcessingFee: 20000,
    collateralRequired: true,
    loanPurpose: "Farm inputs, machinery, and irrigation systems",
  },
];

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
