import { Schema, models, model, Document } from "mongoose";

export interface IFixedDeposit extends Document {
  totalAmount: number;
  monthlyInterestRate: number;
  interestEarned: number;
}

const FixedDepositSchema: Schema = new Schema({
  totalAmount: {
    type: Number,
    required: true,
  },
  monthlyInterestRate: {
    type: Number,
    required: true,
    default: 0.006, // 0.6% per month by default
  },
  interestEarned: {
    type: Number,
    required: true,
    default: 0,
  },
});

const FixedDeposit = models.FixedDeposit ||
model<IFixedDeposit>("FixedDeposit", FixedDepositSchema);

export default FixedDeposit;
