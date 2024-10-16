"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoreVertical } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import React from "react";
import { useAuth } from "@clerk/nextjs";
import addExitNotice from "@/lib/actions/member.actions";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const Popup = ({ noticeExist }: { noticeExist: boolean }) => {
  const { toast } = useToast();
  const { userId } = useAuth();

  console.log("Notice", noticeExist);

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
    <Popover>
      <PopoverTrigger>
        <MoreVertical className="font-semibold text-orange70" />
      </PopoverTrigger>
      <PopoverContent className="bg-dark100-light10 border-0  p-2  shadow-md ">
        <AlertDialog>
          <AlertDialogTrigger className=" bg-dark90-light20 w-full rounded-md  px-2 py-1 text-start  text-orange20 hover:bg-white dark:hover:bg-dark80">
            {noticeExist ? "Remove Exit Notice" : "Place Exit Notice"}
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-dark100-light10 border border-orange40">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-xl font-semibold text-orange20">
                Continue to remove notice
              </AlertDialogTitle>
              <AlertDialogDescription className="text-[0.9rem]">
                {noticeExist ? (
                  <p>
                    This action mean your exit plan will be canceled{" "}
                    <span className="font-semibold text-green-500">
                      You now be eligable for loan application{" "}
                    </span>
                  </p>
                ) : (
                  <p>
                    This action requires you to clear you loans in one month,
                    and ensure all loan you guaranteed are settled.{" "}
                    <span className="font-semibold text-red-500">
                      You will no longer be eligable for a loan{" "}
                    </span>
                  </p>
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="space-x-4">
              <AlertDialogCancel className="bg-orange70 text-base uppercase  text-white hover:bg-orange80">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className={cn(
                  " text-base uppercase text-white  hover:text-white",
                  {
                    " hover:bg-green-600 bg-green-500": noticeExist,
                    " hover:bg-red-600 bg-red-500": !noticeExist,
                  }
                )}
                onClick={handleExitNotice}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </PopoverContent>
    </Popover>
  );
};

export default Popup;
