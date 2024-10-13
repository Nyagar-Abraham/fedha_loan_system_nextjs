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
