"use server";

import { connectToDatabase } from "../utils";
import { CreateMemberParams, UpdateMemberParams } from "./shared.types";

export default async function createMember(memberParams: CreateMemberParams) {
  try {
    await connectToDatabase();

    const {} = memberParams;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default async function updateMember(memberParams: UpdateMemberParams) {
  try {
    await connectToDatabase();

    const {} = memberParams;
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
