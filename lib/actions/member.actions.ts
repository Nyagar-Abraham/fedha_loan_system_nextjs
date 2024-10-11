"use server";

import { connectToDatabase } from "../utils";
import {
  CreateMemberParams,
  DeleteMemberParams,
  UpdateMemberParams,
} from "./shared.types";

export async function createMember(memberParams: CreateMemberParams) {
  try {
    await connectToDatabase();

    const {} = memberParams;
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
