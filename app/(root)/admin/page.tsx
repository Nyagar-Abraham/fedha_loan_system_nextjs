import { auth, clerkClient } from "@clerk/nextjs/server";

import ChangeUserRole from "@/components/admin/ChangeUserRole";
import { SearchUsers } from "@/components/admin/SearchUsers";
import CopyToClipboardButton from "@/components/shared/CopyToClipboardButton";
import Popup from "@/components/shared/Popup";
import { bankColumns } from "@/components/tables/bankColumns";
import DataTable from "@/components/tables/DataTable";
import { Badge } from "@/components/ui/badge";
import { BankTypeFields } from "@/constants/enums";
import { getAllBanks } from "@/lib/actions/bank.actions";
import { getLoanTypesAdmin } from "@/lib/actions/loanTypes.actions";
import { getCurrentUser } from "@/lib/actions/member.actions";

export default async function AdminDashboard(params: {
  searchParams: Promise<{ search?: string }>;
}) {
  const { userId } = auth();

  const [member, loanTypes, banks] = await Promise.all([
    getCurrentUser({
      userId: userId!,
    }),
    getLoanTypesAdmin(),
    getAllBanks({
      path: "admin",
    }),

    // getUserLoan({
    //   userId,
    //   page: searchParams?.page ? +searchParams.page : 1,
    //   pageSize: 4,
    // }),
  ]);

  const query = (await params.searchParams).search;

  const client = await clerkClient();

  const users = query ? (await client.users.getUserList({ query })).data : [];

  console.log(loanTypes);

  return (
    <div className="mx-auto pb-24">
      <div className="mb-7 flex items-center justify-between ">
        <h1 className=" text-4xl font-semibold text-orange90">
          Admin{" "}
          {member?.name
            ? member?.name.split("-")[0].toString()
            : member?.username}
        </h1>
        <Popup />
      </div>

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

      <div className="mt-8">
        <DataTable
          columns={bankColumns}
          data={banks}
          filter={BankTypeFields.NAME}
        />
      </div>
    </div>
  );
}
