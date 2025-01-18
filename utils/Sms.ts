import { ID } from "node-appwrite";

import { messaging } from "@/lib/appwrite.config";

export const sendSMSNotification = async (userId: string, content: string) => {
  try {
    const message = await messaging.createSms(
      ID.unique(),
      content,
      [],
      [userId]
    );

    return message;
  } catch (error) {
    console.log(error);
  }
};
