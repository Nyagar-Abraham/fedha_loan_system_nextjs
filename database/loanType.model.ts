import { Schema, models, model, Document } from "mongoose";

export interface ILoanType extends Document {
  name: string;
  intrestRate: number;
  maxLoanAmount: number;
  repaymentPeriod: string;
  eligibilityCriteria?: string[];
  loanProcessingFee: number;
  downPayment?: number; // For loans requiring a down payment.
  vehicleType?: string; // For car loans.
  propertyType?: string; // For mortgage loans.
  moratoriumPeriod?: string; // For education loans.
  collateralRequired?: boolean; // For business loans.
  businesstype?: string; // Specific to business loans.
}

const LoanTypeSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  intrestRate: { type: Number, required: true },
  maxLoanAmount: { type: Number, required: true },
  repaymentPeriod: { type: String, required: true },
  eligibilityCriteria: { type: [String], default: [], required: false },
  loanProcessingFee: { type: Number, default: 0 },
  downPayment: { type: Number },
  vehicleType: { type: String },
  propertyType: { type: String },
  moratoriumPeriod: { type: String },
  collateralRequired: { type: Boolean },
  businessType: { type: String },
});

const LoanType = models.LoanType || model("LoanType", LoanTypeSchema);

export default LoanType;
