import * as sdk from "node-appwrite";

export const { API_KEY } = process.env;

const client = new sdk.Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("678a2281002bc2dff9cf")
  .setKey(API_KEY!);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);

// const promise = storage.createFile(
//   "678f6351002c5ab7e87e",
//   sdk.ID.unique(),
//   document.getElementById("uploader").files[0]
// );

// promise.then(
//   function (res) {
//     console.log("res", res);
//   },
//   function (error) {
//     console.log("error", error);
//   }
// );

// export const databases = new sdk.Databases(client)
// export const Users = new sdk.Users(client)
