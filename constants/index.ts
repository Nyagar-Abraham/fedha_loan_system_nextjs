import { LayoutDashboard, DollarSign } from "lucide-react";

import barclaysLogo from "@/public/barclays-bank-logo.jpeg";
import commercialLogo from "@/public/commercial-bank-logo.png";
import equityLogo from "@/public/equity-bank-logo.png";
import kcbLogo from "@/public/kcb-bank-logo.jpg";

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
];

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
