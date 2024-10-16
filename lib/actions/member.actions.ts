/* eslint-disable no-empty-pattern */
"use server";

import { connectToDatabase } from "../mongoose";
import {
  CreateMemberParams,
  DeleteMemberParams,
  UpdateMemberParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Member from "@/database/members.model";
import Loan from "@/database/loans.model";

// CREATE MEMBER
export async function createMember(memberParams: CreateMemberParams) {
  try {
    await connectToDatabase();
    console.log("CONNECTED");

    const { clerkId, name, username, email, picture, path } = memberParams;

    await Member.create({
      name,
      username,
      clerkId,
      picture,
      email,
    });

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

    const {} = deleteMember;
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
