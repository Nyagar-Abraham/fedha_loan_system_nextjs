import { Schema, model, models, Document } from "mongoose";

export interface IDividend extends Document {
  memberId: Schema.Types.ObjectId;
  amount: number;
  dateDeclared: Date;
  paymentStatus: "pending" | "paid";
}

const DividendSchema: Schema = new Schema<IDividend>({
  memberId: { type: Schema.Types.ObjectId, ref: "Member", required: true },
  amount: { type: Number, required: true, min: 0 },
  dateDeclared: { type: Date, required: true, default: Date.now },
  paymentStatus: {
    type: String,
    required: true,
    enum: ["pending", "paid"],
    default: "pending",
  },
});

const Dividend =
  models.Dividend || model<IDividend>("Dividend", DividendSchema);

export default Dividend;
