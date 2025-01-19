import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import { AddLoanForm } from "../forms/AddLoanForm";
import Modal from "../Modal";

const AddLoan = () => {
  return (
    <Modal
      title="Add Loan Type"
      trigger={
        <Button className="flex items-center justify-start gap-2 rounded-md bg-orange80  text-xl font-semibold text-orange20 hover:bg-orange70">
          <PlusIcon className="size-5" />
          <span className=""> Add Loan</span>
        </Button>
      }
    >
      <AddLoanForm />
    </Modal>
  );
};

export default AddLoan;
