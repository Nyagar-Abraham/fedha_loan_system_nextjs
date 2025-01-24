import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import { BankForm } from "../forms/BankForm";
import Modal from "../shared/Modal";

const AddBank = () => {
  return (
    <Modal
      title="Add Bank"
      trigger={
        <Button className="bg-dark80-light30 hover:bg-dark80-light30 flex items-center justify-start gap-2 rounded-md border-[1.5px] border-orange70/70 py-3  text-xl font-semibold !text-orange70 hover:border-orange90 hover:!text-orange90">
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
