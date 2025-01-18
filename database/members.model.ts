import { Schema, models, model, Document } from "mongoose";

export interface IMember extends Document {
  clerkId: string;
  name: string;
  username?: string;
  age?: number;
  email: string;
  // password:string;
  phone: string;
  address?: string;
  picture?: string;
  role: string;
  exitNoticeDate: Date;
  registrationFee: number;
  shares: number;
  monthlyContributions?: { amount: number; date: Date }[];
  loans: Schema.Types.ObjectId[];
  joinedAt: Date;
}

const MemberSchema: Schema = new Schema<IMember>({
  clerkId: { type: String, required: true },
  name: { type: String, required: true },
  username: { type: String },
  age: { type: Number },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  picture: { type: String },
  role: {
    type: String,
    required: true,
    enum: ["member", "admin", "staff"],
    default: "member",
  },
  exitNoticeDate: { type: Date },
  registrationFee: {
    type: Number,
    required: true,
    default: 1000,
  },
  shares: {
    type: Number,
    required: true,
    default: 0,
  },
  monthlyContributions: {
    type: [
      {
        amount: { type: Number, required: true, min: 0 },
        date: { type: Date, required: true },
      },
    ],
  },
  loans: [{ type: Schema.Types.ObjectId, ref: "Loan" }],
  joinedAt: { type: Date, required: true, default: Date.now },
});

// const MonthlyContributionSchema = new Schema({
//   amount: { type: Number, required: true },
//   date: { type: Date, required: true },
// });

// const MemberSchema: Schema = new Schema({
//   clerkId: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   name: {
//     type: String,
//     required: true,
//   },
//   username: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   age: {
//     type: Number,
//     min: 18,
//     max: 35,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   picture: {
//     type: String,
//     required: false,
//   },
//   joinedAt: {
//     type: Date,
//     required: true,
//     default: Date.now,
//   },
//   exitNoticeDate: {
//     type: Date,
//     required: false,
//   },
//   registrationFee: {
//     type: Number,
//     required: true,
//     default: 1000,
//   },
//   shares: {
//     type: Number,
//     required: true,
//     default: 500,
//   },
//   monthlyContributions: { type: [MonthlyContributionSchema] },
//   loans: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: "Loan",
//     },
//   ],
//   guarantorFor: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: "Loan",
//     },
//   ],
// });

const Member = models.Member || model("Member", MemberSchema);

export default Member;
