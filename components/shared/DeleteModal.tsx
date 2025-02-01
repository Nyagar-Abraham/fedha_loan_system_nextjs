import { TrashIcon } from "lucide-react";
import React from "react";

import AlertModal from "./AlertModal";
import { Button } from "../ui/button";

const DeleteModal = ({
  children,
  name,
}: {
  children: React.ReactNode;
  name: string;
}) => {
  return (
    <AlertModal
      trigger={
        <Button
          variant="outline"
          className="hover: ml-auto space-x-2 border-[1.5px] border-red-500 bg-inherit text-[0.9rem]  uppercase tracking-wide text-red-500 hover:border-red-600 hover:bg-inherit hover:!text-red-600"
        >
          <TrashIcon className="size-5" />
          Delete
        </Button>
      }
      description={`Are you sure you sure you want to delete all ${name}, this action can\`t be undone  `}
      title={`Delete Selected ${name}`}
    >
      {children}
    </AlertModal>
  );
};

export default DeleteModal;
