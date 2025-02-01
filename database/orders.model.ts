import { Schema, model, models, Document } from "mongoose";

export interface IOrder extends Document {
  loanTypeOrder: Schema.Types.ObjectId[];
}

const OrderSchema = new Schema<IOrder>({
  loanTypeOrder: {
    type: [Schema.Types.ObjectId],
    ref: "LoanType",
    required: true,
  },
});

const Order = models.Order || model<IOrder>("Order", OrderSchema);

export default Order;
