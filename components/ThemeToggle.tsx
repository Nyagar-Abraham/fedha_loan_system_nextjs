"use client";

import * as React from "react";
import { Sun, Moon, Laptop } from "lucide-react";
import { useTheme } from "next-themes";
import themes from "@/constants";


import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface Theme {
  theme:string,
  name:string,
}

export default function ThemeToggle() {
  const {theme,setTheme} = useTheme();

  console.log( useTheme())



  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="group bg-transparent   p-5 hover:bg-orange80   "
          size="icon"
        >
          <Sun className="size-[1.5rem] rotate-0 scale-100 fill-orange80 text-orange80  transition-all dark:rotate-90 dark:scale-0 group-hover:text-white group-hover:fill-white" />
          <Moon className="absolute size-[1.5rem] rotate-0 scale-0  fill-orange80 text-orange80 transition-all dark:rotate-0 dark:scale-100 group-hover:!text-white group-hover:!fill-white dark:group-hover:text-white dark:group-hover:fill-white" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map((t:Theme) =>
         (<DropdownMenuItem key={t.name} className={cn("flex items-center gap-4 border-l-4",{
          " border-orange80 ":theme === t.theme,
          " border-transparent ":theme !== t.theme,
         })} onClick={() => setTheme(t.theme)}>
          {t.theme === "dark" &&<Moon className="text-orange50 dark:text-orange30"/>}
          {t.theme === "light" &&<Sun className="text-orange50  dark:text-orange30"/>}
          {t.theme === "system" &&<Laptop className="text-orange50  dark:text-orange30"/>}
          <span>{t.name}</span>
       </DropdownMenuItem>)
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
