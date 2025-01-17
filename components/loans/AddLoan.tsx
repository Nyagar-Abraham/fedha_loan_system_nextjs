import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { AddLoanForm } from "../forms/AddLoanForm";

const AddLoan = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 bg-orange80  text-xl font-semibold text-orange20 hover:bg-orange70">
          <PlusIcon className="size-5" />
          <span className="max-md:hidden"> Add Loan</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-dark90-light20 border border-orange20/30 md:max-w-[40rem]">
        <DialogHeader>
          <DialogTitle className="mb-3 text-2xl text-orange80">
            Add Loan Type
          </DialogTitle>
        </DialogHeader>
        {/* form */}
        <AddLoanForm />
      </DialogContent>
    </Dialog>
  );
};

export default AddLoan;
