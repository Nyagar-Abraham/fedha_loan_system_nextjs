import { Schema, models, model, Document } from "mongoose";

export interface ILoan extends Document {
  member: Schema.Types.ObjectId;
  loanType: "Emergency" | "Short" | "Development" | "Normal";
  amount: number;
  interestRate: number;
  repaymentPeriod: number; // in months
  guarantors: Schema.Types.ObjectId[];
  monthlyRepayment: number;
  balance: number;
  status: string;
}

const LoanSchema: Schema = new Schema({
  member: {
    type: Schema.Types.ObjectId,
    ref: "Member",
    required: true,
  },
  loanType: {
    type: String,
    enum: ["Emergency", "Short", "Development", "Normal"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  interestRate: {
    type: Number,
    required: true,
  },
  repaymentPeriod: {
    type: Number, // in months
    required: true,
  },
  guarantors: [
    {
      type: Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },
  ],
  monthlyRepayment: {
    type: Number,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected", "Paid", "Defaulted"],
    required: true,
    default: "Pending",
  },
});

const Loan = models.Loan || model<ILoan>("Loan", LoanSchema);

export default Loan;
