import { z } from "zod";

// const guarantorSchema = z.object({
//   _id: z.string(),
//   amount: z.number(),
// });

export const LoanSchema = z.object({
  amount: z.number().min(100),
  age: z.number().min(18).max(35),
  type: z.string().min(2),
  guarantors: z.array(z.string().min(2)).min(1).max(3),
});

export const AddLoanFormSchema = z.object({
  name: z
    .string()
    .min(4, {
      message: "name must be at least 2 characters.",
    })
    .max(500),
  category: z.string().min(4).max(500),
  maximumAmount: z.string().min(3).max(1000),
  intrestRate: z
    .number()
    .refine(
      (n) => !z.number().int().safeParse(n).success,
      "should not be integer"
    ),
  repaymentPeriod: z.number().int(),
  monthlyInstallment: z.string().min(3).max(1000),
  bank: z.enum(["Commercial Bank", "Equity Bank", "KCB Bank", "Barclays Bank"]),
  isRecommended: z.boolean(),
});

export const ContributionSchema = z.object({
  amount: z.number().min(500, { message: "Amount must be at least 500" }),
  date: z.date().min(new Date(), { message: "Date cannot be in the past" }),
  typeOfContribution: z.enum(["normal", "fixed"]),
});
