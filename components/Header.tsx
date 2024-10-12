"use client";
import Logo from "./Logo";
import Navigation from "./Navigation";
import { MobileNav } from "./MobileNav";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Header = () => {
  const pathname = usePathname();
  return (
    <header
      className={cn("fixed inset-x-0 top-0 z-20   px-8 py-5 backdrop-blur-sm", {
        "border-b dark:border-slate-700 border-slate-200 backdrop-blur-lg":
          pathname !== "/",
      })}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Logo />
        <Navigation />
        <MobileNav />
      </div>
    </header>
  );
};

export default Header;
