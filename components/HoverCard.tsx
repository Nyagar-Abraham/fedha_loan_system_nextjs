import { MousePointer } from "lucide-react";
import React from "react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export function HoverCardComp({ children }: { children: React.ReactNode }) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent
        align="end"
        className="bg-dark80-light30 w-80 text-dark70  dark:text-orange20 "
      >
        <div className="flex items-center justify-start gap-4">
          <MousePointer className="" />
          <span>Click icon for more options</span>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
