import { Schema, models, model, Document } from "mongoose";

export interface ILoan extends Document {
  userId: Schema.Types.ObjectId;
  loanTypeId: Schema.Types.ObjectId;
  bankId: Schema.Types.ObjectId;
  amount: number;
  status?: string;
  interestRate: number;
  durationMonths: number;
  monthlyInstallment: number;
  totalRepayment: number;
  applicationDate: Date;
  approvalDate?: Date;
  disbursementDate?: Date;
  repaymentSchedule?: {
    dueDate: Date;
    amount: number;
    status: string;
  }[];
  guarantors: Schema.Types.ObjectId[];
  collateral?: string;
  remarks?: string;
  isDefaulted: boolean;
}

const LoanSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    loanTypeId: {
      type: Schema.Types.ObjectId,
      ref: "LoanType",
      required: true,
    },
    bankId: {
      type: Schema.Types.ObjectId,
      ref: "LoanType",
      required: true,
    },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "disbursed", "completed"],
      default: "pending",
    },
    interestRate: { type: Number, required: true },
    durationMonths: { type: Number, required: true },
    monthlyInstallment: { type: Number, required: true },
    totalRepayment: { type: Number, required: true },
    applicationDate: { type: Date, default: Date.now },
    approvalDate: { type: Date },
    disbursementDate: { type: Date },
    repaymentSchedule: [
      {
        dueDate: { type: Date, required: true },
        amount: { type: Number, required: true },
        status: { type: String, enum: ["pending", "paid"], default: "pending" },
      },
    ],
    guarantors: [{ type: Schema.Types.ObjectId, ref: "Guarantor" }],
    collateral: { type: String },
    remarks: { type: String },
    isDefaulted: { type: Boolean, default: false },
  },
  { timestamps: true } // Adds createdAt and updatedAt automatically
);

const Loan = models.Loan || model<ILoan>("Loan", LoanSchema);

export default Loan;

// export interface ILoan extends Document {
//   member: Schema.Types.ObjectId;
//   loanType: "Emergency" | "Short" | "Development" | "Normal";
//   amount: number;
//   interestRate: number;
//   repaymentPeriod: number; // in months
//   guarantors: Schema.Types.ObjectId[];
//   monthlyRepayment: number;
//   balance: number;
//   status: string;
// }

// const LoanSchema: Schema = new Schema({
//   member: {
//     type: Schema.Types.ObjectId,
//     ref: "Member",
//     required: true,
//   },
//   loanType: {
//     type: String,
//     enum: ["Emergency", "Short", "Development", "Normal"],
//     required: true,
//   },
//   amount: {
//     type: Number,
//     required: true,
//   },
//   interestRate: {
//     type: Number,
//     required: true,
//   },
//   repaymentPeriod: {
//     type: Number, // in months
//     required: true,
//   },
//   guarantors: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: "Member",
//       required: true,
//     },
//   ],
//   monthlyRepayment: {
//     type: Number,
//     required: true,
//   },
//   balance: {
//     type: Number,
//     required: true,
//   },
//   status: {
//     type: String,
//     enum: ["Pending", "Approved", "Rejected", "Paid", "Defaulted"],
//     required: true,
//     default: "Pending",
//   },
// });
