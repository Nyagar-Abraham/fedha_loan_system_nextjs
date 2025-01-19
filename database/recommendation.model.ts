import { Schema, models, model, Document } from "mongoose";

export interface IRecommendation extends Document {
  viewerId: Schema.Types.ObjectId;
  loanTypeId: Schema.Types.ObjectId;
}

const RecommendationSchema = new Schema<IRecommendation>(
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

const Recommendation =
  models.Recommendation ||
  model<IRecommendation>("Recommendation", RecommendationSchema);

export default Recommendation;
