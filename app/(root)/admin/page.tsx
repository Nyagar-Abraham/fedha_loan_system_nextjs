import { clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import ChangeUserRole from "@/components/admin/ChangeUserRole";
import { SearchUsers } from "@/components/admin/SearchUsers";
import CopyToClipboardButton from "@/components/shared/CopyToClipboardButton";
import { Badge } from "@/components/ui/badge";
import { checkRole } from "@/utils/roles";

export default async function AdminDashboard(params: {
  searchParams: Promise<{ search?: string }>;
}) {
  if (!checkRole("admin")) {
    redirect("/");
  }

  const query = (await params.searchParams).search;

  const client = await clerkClient();

  const users = query ? (await client.users.getUserList({ query })).data : [];

  return (
    <>
      <SearchUsers />

      <div className="mt-8 grid md:grid-cols-2">
        {users.map((user) => {
          return (
            <div
              className="bg-dark80-light30 space-y-3 rounded-sm  p-3"
              key={user.id}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="-mb-3 text-[1.3rem] font-semibold text-orange-950 dark:text-orange30">
                    {user.firstName} {user.lastName}
                  </p>
                  <CopyToClipboardButton
                    text={`${
                      user.emailAddresses.find(
                        (email) => email.id === user.primaryEmailAddressId
                      )?.emailAddress
                    }`}
                    className="bg-dark80-light30 hover:bg-dark80-light30 px-0 py-1 dark:text-orange10/80"
                  />
                </div>

                <Badge className="bg-orange70 text-[0.8rem] uppercase text-white hover:bg-orange80 ">
                  {user.publicMetadata.role as string}
                </Badge>
              </div>
              <ChangeUserRole userId={user.id} />
            </div>
          );
        })}
      </div>
    </>
  );
}
