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
  intrestRate: z
    .number()
    .refine(
      (n) => !z.number().int().safeParse(n).success,
      "should not be integer"
    ),
  maximumLoanAmount: z.number().min(1000).max(100000),
  repaymentPeriod: z.number().int().min(0),
  eligibilityCriteria: z.optional(z.array(z.string().min(3).max(500)).max(10)),
  loanProcessingFee: z.number().int().min(0),
  downPayment: z.optional(z.number().int().min(0)),
  vehicleType: z.optional(z.string().min(2).max(100)),
  propertyType: z.optional(z.string().min(2).max(500)),
  moratoriumPeriod: z.optional(z.string().min(2).max(500)),
  collateralRequired: z.optional(z.boolean()),
  businessType: z.optional(z.string().min(2).max(500)),
  loanPurpose: z.optional(z.string().min(2).max(500)),
});

export const ContributionSchema = z.object({
  amount: z.number().min(500, { message: "Amount must be at least 500" }),
  date: z.date().min(new Date(), { message: "Date cannot be in the past" }),
  typeOfContribution: z.enum(["normal", "fixed"]),
});
