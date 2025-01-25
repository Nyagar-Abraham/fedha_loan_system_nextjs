import { usePathname } from "next/navigation";
import { useState } from "react";

import { useToast } from "@/hooks/use-toast";
import { deleteBanks } from "@/lib/actions/bank.actions";

import AlertFooterComp from "../shared/AlertFooterComp";

const DeleteBank = ({ value, name }: { value: string[]; name: string }) => {
  const [deleting, setDeleting] = useState<boolean>(false);
  const pathname = usePathname();
  const { toast } = useToast();

  async function handleDelete() {
    setDeleting(true);
    try {
      await deleteBanks({ bankIds: value, path: pathname });

      toast({
        title: `${name} Successfully deleted`,
        description: "",
        duration: 3000,
      });
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } finally {
      setDeleting(false);
    }
  }

  return (
    <AlertFooterComp
      onClick={handleDelete}
      deletingTxt="Deleting..."
      deleting={deleting}
    />
  );
};

export default DeleteBank;
