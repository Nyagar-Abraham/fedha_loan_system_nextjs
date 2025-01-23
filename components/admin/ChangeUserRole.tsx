"use client";

import { useState } from "react";

import { setRole, removeRole } from "@/lib/actions/admin.actions";

import SubmitButtom from "../shared/SubmitButtom";

const ChangeUserRole = ({ userId }: { userId: string }) => {
  const [makeAdmin, setMakeAdmin] = useState<boolean>(false);
  const [makeModerator, setMakeModerator] = useState<boolean>(false);
  const [removingRole, setRemovingRole] = useState<boolean>(false);
  return (
    <div className="flex flex-wrap gap-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setMakeAdmin(true);
          const form = e.currentTarget as HTMLFormElement;
          const formData = new FormData(form);

          setRole(formData);

          setMakeAdmin(false);
        }}
      >
        <input type="hidden" value={userId} name="id" />
        <input type="hidden" value="admin" name="role" />
        <SubmitButtom
          submitTxt="Make Admin"
          submittingTxt="Making Admin"
          submitting={makeAdmin}
          className="border border-orange70 bg-inherit px-3 py-1 text-base font-normal hover:bg-inherit hover:text-orange70"
        />
      </form>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setMakeModerator(true);
          const form = e.currentTarget as HTMLFormElement;
          const formData = new FormData(form);

          setRole(formData);

          setMakeModerator(false);
        }}
      >
        <input type="hidden" value={userId} name="id" />
        <input type="hidden" value="moderator" name="role" />

        <SubmitButtom
          submitTxt="Make Moderator"
          submittingTxt="Making Moderator"
          submitting={makeModerator}
          className="border border-orange70 bg-inherit px-3 py-1 text-base font-normal hover:bg-inherit hover:text-orange70"
        />
      </form>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setRemovingRole(true);
          const form = e.currentTarget as HTMLFormElement;
          const formData = new FormData(form);

          removeRole(formData);

          setRemovingRole(false);
        }}
      >
        <input type="hidden" value={userId} name="id" />

        <SubmitButtom
          submitTxt="Remove Role"
          submittingTxt="Removing Role"
          submitting={removingRole}
          className="border border-orange70 bg-inherit px-3 py-1 text-base font-normal hover:bg-inherit hover:text-orange70"
        />
      </form>
    </div>
  );
};

export default ChangeUserRole;
