"use client";

// import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { NavRoutes } from "@/constants";
import { navRoutesInterface } from "@/lib/Interfaces";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function MobileNav() {
  const pathname = usePathname();
  return (
    <div className="block md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <HamburgerMenuIcon
            className={cn("size-10 ", {
              "text-white": pathname === "/",
            })}
          />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="flex flex-col gap-8 px-4 py-8 pb-20"
        >
          <SheetHeader>
            <SheetTitle className="bg-gradient-to-r from-red-200 to-slate-50 bg-clip-text text-2xl font-bold text-transparent">
              Fedha Youth Group
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-4 ">
            {NavRoutes.map((navRoute: navRoutesInterface) => (
              <SheetClose key={navRoute.href} asChild>
                <Link
                  href={navRoute.href}
                  className={cn(
                    "bg:slate-200 text-xl flex-1 rounded-md px-4 py-3 dark:bg-slate-900 hover:dark:bg-slate-800",
                    {
                      "border-b-2 border-green-600": pathname === navRoute.href,
                    }
                  )}
                >
                  {navRoute.route}
                </Link>
              </SheetClose>
            ))}
          </div>
          <div className="mt-auto flex flex-col gap-4">
            <SignedIn>
              <SheetClose
                asChild
                className="bg:slate-200 flex-1 rounded-md px-4 py-3 text-xl font-semibold dark:bg-rose-950 dark:text-red-100 hover:dark:bg-rose-900"
              >
                <SignOutButton />
              </SheetClose>
            </SignedIn>

            <SignedOut>
              <SheetClose
                asChild
                className="bg:slate-200 flex-1 rounded-md px-4 py-3 text-xl font-semibold dark:bg-rose-950 dark:text-red-100 hover:dark:bg-rose-900"
              >
                <SignInButton />
              </SheetClose>
            </SignedOut>
            <SheetClose
              asChild
              className="flex flex-1 items-center justify-center text-xl"
            >
              <div>
                <ThemeToggle />
              </div>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
