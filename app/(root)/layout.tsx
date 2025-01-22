import React from "react";

import SideBar from "@/components/shared/SideBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    // <SidebarProvider>
    <div className="flex flex-1 flex-col  ">
      {/* <SideBar /> */}
      <main
        className={cn(
          "py-4 px-4 relative  sm:px-8 md:px-12  shadow-sm  flex-1  lg:w-[70rem] md:border-x-2 dark:md:border-main mx-auto w-full md:w-[50rem] bg-dark90-light20"
        )}
      >
        {" "}
        {/* <SidebarTrigger /> */}
        {children}
      </main>
    </div>
    // </SidebarProvider>
  );
};

export default layout;
