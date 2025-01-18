import { Schema, model, models, Document } from "mongoose";

export interface IFixedDeposit extends Document {
  memberId: Schema.Types.ObjectId;
  principalAmount: number;
  interestRate: number;
  startDate: Date;
  maturityDate: Date;
  status: "active" | "matured" | "withdrawn";
  totalMaturityAmount?: number;
}

const FixedDepositSchema = new Schema<IFixedDeposit>({
  memberId: { type: Schema.Types.ObjectId, ref: "Member", required: true },
  principalAmount: { type: Number, required: true, min: 0 },
  interestRate: { type: Number, required: true, min: 0, default: 0.06 },
  startDate: { type: Date, required: true },
  maturityDate: { type: Date, required: true },
  status: {
    type: String,
    required: true,
    enum: ["active", "matured", "withdrawn"],
    default: "active",
  },
  totalMaturityAmount: { type: Number, min: 0 },
});

const FixedDeposit =
  models.FixedDeposit ||
  model<IFixedDeposit>("FixedDeposit", FixedDepositSchema);

export default FixedDeposit;
