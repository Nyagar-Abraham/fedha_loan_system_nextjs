import { useAuth } from "@clerk/nextjs";
import { Trash } from "lucide-react";

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import addExitNotice from "@/lib/actions/member.actions";
import { cn } from "@/lib/utils";

import AlertModal from "./AlertModal";

const ExitAlert = ({ noticeExist }: { noticeExist: boolean }) => {
  const { toast } = useToast();
  const { userId } = useAuth();

  const handleExitNotice = async () => {
    const member = await addExitNotice({ clerkId: userId!, noticeExist });

    if (member) {
      toast({
        title: `${noticeExist ? "Notice Successfully Removed" : "Notice Successfully Placed"}`,
        duration: 5000,
      });
    }
  };

  return (
    <AlertModal
      trigger={
        <>
          <Trash className=" group-hover:text-orange80  " />
          <span>
            {" "}
            {noticeExist ? "Remove Exit Notice" : "Place Exit Notice"}
          </span>
        </>
      }
      title={`Continue to ${noticeExist ? "remove" : "place"} notice`}
      description={
        noticeExist ? (
          <p>
            This action mean your exit plan will be canceled{" "}
            <span className="font-semibold text-green-500">
              You now be eligable for loan application{" "}
            </span>
          </p>
        ) : (
          <p>
            This action requires you to clear you loans in one month, and ensure
            all loan you guaranteed are settled.{" "}
            <span className="font-semibold text-red-500">
              You will no longer be eligable for a loan{" "}
            </span>
          </p>
        )
      }
    >
      <AlertDialogFooter className="sm:gap-4">
        <AlertDialogCancel className="rounded-md bg-orange70 text-base uppercase  text-white hover:bg-orange80">
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction
          className={cn(" text-base uppercase text-white  hover:text-white", {
            " hover:bg-green-600 bg-green-500": noticeExist,
            " hover:bg-red-600 bg-red-500": !noticeExist,
          })}
          onClick={handleExitNotice}
        >
          Continue
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertModal>

    // <AlertDialog>
    //   <AlertDialogTrigger className="bg-dark90-light20 group flex w-full  items-center gap-3 rounded-md  px-2 py-1 text-start text-orange20 hover:text-orange60 hover:shadow-sm dark:hover:text-orange30">

    //   </AlertDialogTrigger>
    //   <AlertDialogContent
    //     className="bg-dark100-light10
    // rounded-sm"
    //   >
    //     <AlertDialogHeader>
    //       <AlertDialogTitle className="text-xl font-semibold text-orange20">
    //
    //       </AlertDialogTitle>
    //       <AlertDialogDescription className="text-[0.9rem]">

    //       </AlertDialogDescription>
    //     </AlertDialogHeader>

    //   </AlertDialogContent>
    // </AlertDialog>
  );
};

export default ExitAlert;
