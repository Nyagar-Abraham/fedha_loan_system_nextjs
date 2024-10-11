export interface CreateMemberParams {
  name: string;
  clerkId: string;
  email: string;
  username: string;
  picture: string;
  path: string;
}

export interface UpdateMemberParams {
  clerkId: string;
  updateData: {
    name: string;
    email: string;
    username: string;
    picture: string;
  };
  path: string;
}

export interface DeleteMemberParams {
  clerkId: string;
}
