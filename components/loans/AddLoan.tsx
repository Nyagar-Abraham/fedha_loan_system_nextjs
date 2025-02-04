import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import { LoanTypeForm } from "../forms/LoanTypeForm";
import Modal from "../shared/Modal";

const AddLoan = () => {
  return (
    <Modal
      title="Add Loan Type"
      trigger={
        <Button className="bg-dark80-light30 hover:bg-dark80-light30 flex items-center justify-start gap-2 rounded-md border-[1.5px] border-orange70/70 py-3  text-xl font-semibold !text-orange70 hover:border-orange90 hover:!text-orange90">
          <PlusIcon className="size-5" />
          <span className=""> Add Loan</span>
        </Button>
      }
    >
      <LoanTypeForm />
    </Modal>
  );
};

export default AddLoan;
