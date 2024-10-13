import { Schema, models, model, Document } from "mongoose";

export interface IMember extends Document {
  clerkId: string;
  name: string;
  username?: string;
  age?: number;
  email: string;
  picture?: string;
  joinedAt: Date;
  exitNoticeDate: Date;
  registrationFee: number;
  shares: number;
  monthlyContributions: number;
  loans: Schema.Types.ObjectId[];
  guarantorFor: Schema.Types.ObjectId[];
}

const MemberSchema: Schema = new Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: false,
    unique: false,
  },
  age: {
    type: Number,
    min: 18,
    max: 35,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  picture: {
    type: String,
    required: false,
  },
  joinedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  exitNoticeDate: {
    type: Date,
    required: false,
  },
  registrationFee: {
    type: Number,
    required: true,
    default: 1000,
  },
  shares: {
    type: Number,
    required: true,
    default: 500,
  },
  monthlyContributions: {
    type: Number,
    required: true,
    default: 500,
  },
  loans: [
    {
      type: Schema.Types.ObjectId,
      ref: "Loan",
    },
  ],
  guarantorFor: [
    {
      type: Schema.Types.ObjectId,
      ref: "Loan",
    },
  ],
});

const Member = models.Member || model("Member", MemberSchema);

export default Member;
