/* eslint-disable no-empty-pattern */
"use server";

import Member from "@/database/members.model";
import { connectToDatabase } from "../mongoose";
import {
  CreateMemberParams,
  DeleteMemberParams,
  UpdateMemberParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";

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

export async function updateMember(updateMemberParams: UpdateMemberParams) {
  try {
    await connectToDatabase();

    const {} = updateMemberParams;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteMember(deleteMember: DeleteMemberParams) {
  try {
    await connectToDatabase();

    const {} = deleteMember;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// export default async function createMember(memberParams:CreateMemberParams){
//   try {
//     await connectToDatabase();

//     const {} = memberParams;

//   } catch (error) {
//     console.log(error)
//     throw error;
//   }
// };
