export const NavRoutes = [
  { href: "/dashboard", route: "Dashboard" },
  { href: "/loan", route: "Apply Loan" },
  { href: "/payloan", route: "Pay Loan" },
];

export const loanTypes = [
  {
    category: "Emergency Loan",
    value: "Emergency",
    maximumAmount: "1x",
    interestRate: 0.3,
    repaymentPeriod: 1,
  },
  {
    category: "Short Loan",
    value: "Short",
    maximumAmount: "2x",
    interestRate: 0.6,
    repaymentPeriod: 2,
  },
  {
    category: "Normal Loan",
    value: "Normal",
    maximumAmount: "3x",
    interestRate: 1.0,
    repaymentPeriod: 3,
  },
  {
    category: "Development Loan",
    value: "Development",
    maximumAmount: "5x",
    interestRate: 1.4,
    repaymentPeriod: 4,
  },
];
