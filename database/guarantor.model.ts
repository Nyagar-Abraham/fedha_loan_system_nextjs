import { Schema, model, models, Document } from "mongoose";

export interface IGuarantor extends Document {
  memberId: Schema.Types.ObjectId;
  loanId: Schema.Types.ObjectId;
  amountGuaranteed: number;
  // contactDetails: {
  //   email: string;
  //   phone: string;
  // };
  createdAt: Date;
}

const GuarantorSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  loanId: { type: Schema.Types.ObjectId, ref: "Loan", required: true },
  amountGuaranteed: { type: Number, required: true },
  // contactDetails: {
  //   email: { type: String, required: true },
  //   phone: { type: String, required: true },
  // },
  createdAt: { type: Date, default: Date.now },
});

const Guarantor = models.Guarantor || model("Guarantor", GuarantorSchema);

export default Guarantor;
