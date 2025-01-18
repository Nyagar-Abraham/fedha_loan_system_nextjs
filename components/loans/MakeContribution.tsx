import { DollarSignIcon } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { ContributionsForm } from "../forms/ContributionsForm";
import { Button } from "../ui/button";

const MakeContribution = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [clicked, setClicked] = useState<boolean>(false);

  return (
    <div className="bg-dark90-light20 flex flex-col gap-2 rounded-md  ">
      <Button
        onClick={() => {
          if (isOpen) {
            setClicked(true);
          }

          if (!isOpen && !clicked) {
            setIsOpen((cur) => !cur);
            setClicked(true);
          }

          if (isOpen && clicked) {
            setClicked(false);
            setIsOpen((cur) => !cur);
          }
        }}
        onMouseEnter={() => {
          if (!clicked) setIsOpen(true);
        }}
        onMouseLeave={() => {
          if (!clicked) setIsOpen(false);
        }}
        className={cn(
          "flex flex-1 items-center rounded-md justify-start  gap-2 bg-orange80 text-xl font-semibold text-orange20 hover:bg-orange70 ",
          {
            "!rounded-t-md bg-transparent hover:bg-transparent hover:text-orange80 text-orange70 ":
              isOpen,
          }
        )}
      >
        <DollarSignIcon className="size-5" />
        <span className=""> Make Contribution</span>
      </Button>

      {isOpen && (
        <>
          <div className="h-[2px] w-full bg-orange70" />
          <ContributionsForm />
        </>
      )}
    </div>
  );
};

export default MakeContribution;
