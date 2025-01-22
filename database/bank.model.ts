import { Schema, model, models, Document } from "mongoose";

export interface IBank extends Document {
  name: string;
  branchCode: string;
  headquarters: string;
  establishedYear: number;
  services: string[];
  contactEmail: string;
  contactPhone: string;
  website: string;
  logo?: string;
}

const BankSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  branchCode: { type: String, required: true, unique: true },
  headquarters: { type: String, required: true },
  establishedYear: { type: Number, required: true },
  services: { type: [String], required: true },
  contactEmail: { type: String, required: true, unique: true },
  contactPhone: { type: String, required: true },
  website: { type: String, required: true },
  logo: {
    type: String,
    required: false,
  },
});

const Bank = models.Bank || model("Bank", BankSchema);

export default Bank;
