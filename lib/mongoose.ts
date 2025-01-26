import mongoose from "mongoose";

import logger from "./logger";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) {
    return logger.info("MISSING MONGODB_URL");
  }

  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "fedha_app",
    });

    isConnected = true;

    logger.info("MongoDB is connected");
  } catch (error) {
    logger.error("MongoDB connection failed", error);
  }
};
