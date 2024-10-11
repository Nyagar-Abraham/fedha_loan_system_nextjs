import { Schema, models, model, Document } from "mongoose";

export interface IDividend extends Document {
  dividendAmount: number;
  officeExpenses: number;
  totalRevenue: number;
  member: Schema.Types.ObjectId;
}

const DividendSchema: Schema = new Schema({
  dividendAmount: {
    type: Number,
    required: true,
  },
  officeExpenses: {
    type: Number,
    required: true,
    default: 0,
  },
  totalRevenue: {
    type: Number,
    required: true,
  },
  member: {
    type: Schema.Types.ObjectId,
    ref: "Member",
    required: true,
  },
});

export default models.Dividend || model<IDividend>("Dividend", DividendSchema);
