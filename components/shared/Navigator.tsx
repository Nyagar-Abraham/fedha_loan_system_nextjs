"use client";

import { Delete, Edit } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { formUrlQuery } from "@/lib/utils";

import AlertModal from "./AlertModal";
import DeleteBank from "../loans/DeleteBank";
import { DropdownMenuItem } from "../ui/dropdown-menu";

const Navigator = ({
  value,
  name,
  extendedPath,
}: {
  value: string;
  name: string;
  extendedPath: string;
}) => {
  const searchParams = useSearchParams();

  const router = useRouter();

  function handleNavigation() {
    const url = formUrlQuery({
      params: searchParams.toString(),
      key: name.toLocaleLowerCase(),
      value,
      extendedPath,
    });

    router.push(url, { scroll: false });
  }

  return (
    <>
      {" "}
      <DropdownMenuItem
        className="flex items-center gap-3 hover:!text-orange70"
        onClick={handleNavigation}
      >
        <Edit className="size-5" />
        Edit
      </DropdownMenuItem>
      <AlertModal
        trigger={
          <DropdownMenuItem
            onSelect={(event) => event.preventDefault()}
            className="flex items-center gap-3 hover:!text-red-500"
          >
            <Delete className="size-5" />
            Delete
          </DropdownMenuItem>
        }
        title={`Delete ${name}`}
        description={`Are you sure you want to delete this ${name}, this action cant be undone`}
      >
        <DeleteBank value={[value]} name={name} />
      </AlertModal>
    </>
  );
};

export default Navigator;
