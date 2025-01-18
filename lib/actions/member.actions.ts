/* eslint-disable no-empty-pattern */
"use server";

import { revalidatePath } from "next/cache";

import Loan from "@/database/loans.model";
import Member from "@/database/members.model";
// import { sendMail } from "@/utils/sendMail";
import { sendSMSNotification } from "@/utils/Sms";

import { connectToDatabase } from "../mongoose";
import {
  CreateMemberParams,
  DeleteMemberParams,
  UpdateMemberParams,
} from "./shared.types";

// CREATE MEMBER
export async function createMember(memberParams: CreateMemberParams) {
  try {
    await connectToDatabase();
    console.log("11111");

    const { clerkId, name, username, email, picture, path } = memberParams;
    console.log("ss", email);

    const member = await Member.create({
      name,
      username,
      clerkId,
      picture,
      email,
    });

    console.log("22222");

    sendSMSNotification(member._id, "you succefully logged in");

    console.log("33333");

    // sendMail({
    //   email: process.env.SMTP_SERVER_USERNAME,
    //   sendTo: process.env.SMTP_SERVER_RECIEVER,
    //   subject: "New regisration",
    //   text: "text",
    //   html: "<p>You are now a registered member of fedha youth group <strong>congratulations</strong></p>",
    // });

    console.log("44444");

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// UPDATE MEMBER
export async function updateMember(updateMemberParams: UpdateMemberParams) {
  try {
    await connectToDatabase();

    console.log("updaded");

    const {} = updateMemberParams;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// DELETE MEMBER
export async function deleteMember(deleteMember: DeleteMemberParams) {
  try {
    await connectToDatabase();

    const { clerkId } = deleteMember;

    await Member.deleteOne({ clerkId });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllMembers() {
  try {
    await connectToDatabase();

    const members = await Member.find({}).select("name shares clerkId").lean();

    return members;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getCurrentUser({ userId }: { userId: string }) {
  try {
    await connectToDatabase();

    await Loan.find({});

    const member = await Member.findOne({ clerkId: userId }).lean();

    return member;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default async function addExitNotice({
  clerkId,
  noticeExist,
}: {
  clerkId: string;
  noticeExist: boolean;
}) {
  try {
    await connectToDatabase();
    let member;
    if (!noticeExist) {
      member = await Member.findOneAndUpdate(
        { clerkId },
        {
          exitNoticeDate: new Date(),
        },
        { new: true }
      ).lean();
    } else {
      member = await Member.findOneAndUpdate(
        { clerkId },
        { $unset: { exitNoticeDate: "" } },
        { new: true }
      ).lean();
    }

    console.log({ member });

    revalidatePath("/dashboard");
    return member;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// export async function createMember(memberParams:CreateMemberParams){
//   try {
//     await connectToDatabase();

//     const {} = memberParams;

//   } catch (error) {
//     console.log(error)
//     throw error;
//   }
// };
