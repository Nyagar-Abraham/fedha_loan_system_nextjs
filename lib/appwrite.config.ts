import * as sdk from "node-appwrite";

export const {
  PROJECT_ID,
  API_KEY,
  NEXT_PUBLIC_ENDPOINT: ENDPOINT,
} = process.env;

const client = new sdk.Client();

client.setEndpoint(ENDPOINT!).setProject(PROJECT_ID!).setKey(API_KEY!);

export const messaging = new sdk.Messaging(client);

// export const databases = new sdk.Databases(client)
// export const storage = new sdk.Storage(client)
// export const Users = new sdk.Users(client)
