"use client";

import { MoreVertical } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import ExitAlert from "./ExitAlert";
import { HoverCardComp } from "./HoverCard";
import AddLoan from "../loans/AddLoan";
import MakeContribution from "../loans/MakeContribution";

const Popup = ({ noticeExist }: { noticeExist?: boolean }) => {
  const pathName = usePathname();

  return (
    <Popover>
      <HoverCardComp>
        <PopoverTrigger>
          <MoreVertical className="font-semibold text-orange70" />
        </PopoverTrigger>
      </HoverCardComp>
      <PopoverContent className="bg-dark80-light30 border-0  p-2  shadow-md ">
        {pathName === "/dashboard" && <ExitAlert noticeExist={noticeExist!} />}

        {pathName === "/loans" && (
          <div className="flex flex-col gap-4  ">
            <AddLoan />
            <MakeContribution />
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default Popup;
