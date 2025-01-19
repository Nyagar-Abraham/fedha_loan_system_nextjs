import { Schema, models, model, Document } from "mongoose";

export interface IView extends Document {
  viewerId: Schema.Types.ObjectId;
  loanTypeId: Schema.Types.ObjectId;
}

const ViewSchema = new Schema<IView>(
  {
    viewerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    loanTypeId: {
      type: Schema.Types.ObjectId,
      ref: "LoanType",
      required: true,
    },
  },
  { timestamps: true }
);

const View = models.View || model<IView>("View", ViewSchema);

export default View;
