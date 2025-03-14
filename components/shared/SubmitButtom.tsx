import { Loader } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";

const SubmitButtom = ({
  submitting,
  className,
  submitTxt,
  submittingTxt,
}: {
  submitting: boolean;
  className?: string;
  submitTxt: string;
  submittingTxt: string;
}) => {
  return (
    <Button
      onClick={() => {}}
      className={cn(
        `text-2xl flex gap-4 items-center font-semibold bg-green80 hover:bg-green90 text-green10 px-12 py-5 rounded-md ${className && className}`
      )}
      disabled={submitting}
      type="submit"
    >
      {submitting ? submittingTxt : submitTxt}
      {submitting && <Loader size={20} className="animate-spin" />}
    </Button>
  );
};

export default SubmitButtom;
