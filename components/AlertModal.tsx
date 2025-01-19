import React from "react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

interface AlertProps {
  children: React.ReactNode;
  trigger: React.ReactNode;
  className?: string;
  description?: React.ReactNode;
  title: string;
}

const AlertModal = ({
  children,
  trigger,
  description,
  title,
  className,
}: AlertProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="bg-dark90-light20 group flex w-full  items-center gap-3 rounded-md  px-2 py-1 text-start text-orange20 hover:text-orange60 hover:shadow-sm dark:hover:text-orange30">
        {trigger}
      </AlertDialogTrigger>
      <AlertDialogContent
        className={cn(`bg-dark90-light20 
    rounded-sm ${className}`)}
      >
        <AlertDialogHeader>
          {title && (
            <AlertDialogTitle className="text-xl font-semibold text-orange20">
              {title}
            </AlertDialogTitle>
          )}

          {description && (
            <AlertDialogDescription className="text-[0.9rem]">
              {description}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>
        {children}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertModal;
