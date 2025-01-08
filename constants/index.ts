import equityLogo from '@/public/equity-bank-logo.png'
import kcbLogo from '@/public/kcb-bank-logo.jpg'
import commercialLogo from '@/public/commercial-bank-logo.png'

export const NavRoutes = [
  { href: "/dashboard", route: "Dashboard" },
  { href: "/loan", route: "Apply Loan" },
  // { href: "/payloan", route: "Pay Loan" },
];

export const loanTypes = [
  {
    category: "Emergency Loan",
    value: "Emergency",
    maximumAmount: "1x shares amount",
    interestRate: 0.003,
    repaymentPeriod: 1,
    monthlyInstallement:"2% of loan",
    bank:"Equity Bank",
    logo:equityLogo
  },
  {
    category: "Short Loan",
    value: "Short",
    maximumAmount: "2x shares amount",
    interestRate: 0.006,
    repaymentPeriod: 2,
    monthlyInstallement:"3% of loan",
    bank:"KCB Bank",
    logo:kcbLogo
  },
  {
    category: "Normal Loan",
    value: "Normal",
    maximumAmount: "3x shares amount",
    interestRate: 0.01,
    repaymentPeriod: 3,
    monthlyInstallement:"4% of loan",
    bank:"Commercial Bank",
    logo:commercialLogo
  },
  {
    category: "Development Loan",
    value: "Development",
    maximumAmount: "5x shares amount",
    interestRate: 0.014,
    repaymentPeriod: 4,
    monthlyInstallement:"5% of loan",
    bank:"Equity Bank",
    logo:equityLogo
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

// export const 

