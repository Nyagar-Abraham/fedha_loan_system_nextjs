import React from "react";

import { cn } from "@/lib/utils";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main
      className={cn(
        " py-4 px-4  sm:px-8 md:px-12  shadow-sm  flex-1  lg:w-[70rem] md:border-x-2 dark:md:border-main mx-auto w-full md:w-[50rem] bg-dark90-light20"
      )}
    >
      {children}
    </main>
  );
};

export default layout;
