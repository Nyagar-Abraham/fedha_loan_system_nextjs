import { Loader } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from "../ui/alert-dialog";

const AlertFooterComp = ({
  onClick,
  notice,
  deleting,
  deletingTxt,
}: {
  onClick: () => Promise<void>;
  notice?: boolean;
  deleting?: boolean;
  deletingTxt: string;
}) => {
  return (
    <AlertDialogFooter className="sm:gap-4">
      <AlertDialogCancel className="rounded-md bg-orange70 text-base uppercase  text-white hover:bg-orange80">
        Cancel
      </AlertDialogCancel>
      <AlertDialogAction
        className={cn(" text-base uppercase text-white  hover:text-white", {
          " hover:bg-green-600 bg-green-500": notice,
          " hover:bg-red-600 bg-red-500": !notice,
        })}
        disabled={deleting}
        onClick={onClick}
      >
        {deleting ? deletingTxt : "Continue"}
        {deleting && <Loader size={20} className="animate-spin" />}
      </AlertDialogAction>
    </AlertDialogFooter>
  );
};

export default AlertFooterComp;
