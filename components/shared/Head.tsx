"use client";

import { usePathname } from "next/navigation";
import React from "react";

import { cn } from "@/lib/utils";

const Head = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <header
      className={cn(
        "fixed backdrop-blur-sm inset-x-0 top-0 z-20 px-8 py-5 xl:px-0 ",
        {
          "border-b dark:border-dark70 border-dark40  backdrop-blur-lg":
            pathname !== "/",
        }
      )}
    >
      {children}
    </header>
  );
};

export default Head;
