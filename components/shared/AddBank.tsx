import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import { BankForm } from "../forms/BankForm";
import Modal from "../shared/Modal";

const AddBank = () => {
  return (
    <Modal
      title="Add Bank"
      trigger={
        <Button className="flex items-center justify-start gap-2 rounded-md bg-orange80  text-xl font-semibold text-orange20 hover:bg-orange70">
          <PlusIcon className="size-5" />
          <span className=""> Add bank</span>
        </Button>
      }
    >
      <BankForm />
    </Modal>
  );
};

export default AddBank;
