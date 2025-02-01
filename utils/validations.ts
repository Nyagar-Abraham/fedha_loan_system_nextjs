import { z } from "zod";

// const guarantorSchema = z.object({
//   _id: z.string(),
//   amount: z.number(),
// });

export const LoanTypeFormSchema = z.object({
  name: z
    .string()
    .min(4, { message: "Name must be at least 4 characters." })
    .max(500, { message: "Name must be less than 500 characters." }),
  intrestRate: z
    .number()
    .min(1, { message: "Interest rate must be at least 1%." })
    .max(25, { message: "Interest rate cannot exceed 25%." }),
  maxLoanAmount: z
    .number()
    .min(1000, { message: "Loan amount must be at least 1000." })
    .max(1000000000, { message: "Loan amount cannot exceed 100,000." }),
  repaymentPeriod: z.string().max(10),
  eligibilityCriteria: z
    .array(z.string().min(3).max(500))
    .max(10, { message: "You can add up to 10 criteria only." })
    .optional(),
  loanProcessingFee: z
    .number()
    .int()
    .min(0, { message: "Loan processing fee must be 0 or more." }),
  downPayment: z
    .number()
    .int()
    .min(0, { message: "Down payment must be 0 or more." })
    .optional(),
  vehicleType: z
    .string()
    .min(2, { message: "Vehicle type must be at least 2 characters." })
    .max(100, { message: "Vehicle type must be less than 100 characters." })
    .optional(),
  propertyType: z
    .string()
    .min(2, { message: "Property type must be at least 2 characters." })
    .max(500, { message: "Property type must be less than 500 characters." })
    .optional(),
  moratoriumPeriod: z
    .string()
    .min(2, { message: "Moratorium period must be at least 2 characters." })
    .max(500, {
      message: "Moratorium period must be less than 500 characters.",
    })
    .optional(),
  collateralRequired: z.boolean(),
  businessType: z
    .string()
    .min(2, { message: "Business type must be at least 2 characters." })
    .max(500, { message: "Business type must be less than 500 characters." })
    .optional(),
});

export const AddBankFormSchema = z.object({
  name: z.string().min(3).max(500),
  branchCode: z.string().min(2).max(100),
  headquarters: z.string().min(2).max(200),
  establishedYear: z.string().max(4),
  contactPhone: z
    .string()
    .min(10, { message: "Must be a valid mobile number" })
    .max(14, { message: "Must be a valid mobile number" }),
  contactEmail: z.string().email(),
  services: z
    .array(z.string().min(3).max(500))
    .max(10, { message: "You can add up to 10 criteria only." }),
  website: z.string().url(),
  logo: z.string().optional(),
});

export const ContributionSchema = z.object({
  name: z.string().min(3).max(500),
  phone: z
    .string()
    .min(10, { message: "Must be a valid mobile number" })
    .max(14, { message: "Must be a valid mobile number" }),
  amount: z.number().min(500, { message: "Amount must be at least 500" }),
  date: z.date().min(new Date(), { message: "Date cannot be in the past" }),
  typeOfContribution: z.enum(["normal", "fixed"]),
});

export const LoanSchema = z.object({
  amount: z.number().min(0),
  intrestRate: z.number(),
  durationMonths: z.number().min(0),
  date: z.date().min(new Date(), { message: "Date cannot be in the past" }),
  guarantors: z.array(z.string()).min(0),
  bank: z.string(),
  collateral: z.string(),
  remarks: z.string(),
});

// export interface ILoan extends Document {
//   userId: Schema.Types.ObjectId;
//   loanTypeId: Schema.Types.ObjectId;
//   bankId: Schema.Types.ObjectId;
//   amount: number;
//   status?: string;
//   interestRate: number;
//   durationMonths: number;
//   monthlyInstallment: number;
//   totalRepayment: number;
//   applicationDate: Date;
//   approvalDate?: Date;
//   disbursementDate?: Date;
//   repaymentSchedule?: {
//     dueDate: Date;
//     amount: number;
//     status: string;
//   }[];
//   guarantors: Schema.Types.ObjectId[];
//   collateral?: string;
//   remarks?: string;
//   isDefaulted: boolean;
// }
