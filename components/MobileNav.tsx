"use client";

// import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavRoutes } from "@/constants";
import { navRoutesInterface } from "@/lib/Interfaces";
import { cn } from "@/lib/utils";

import ThemeToggle from "./ThemeToggle";

export function MobileNav() {
  const pathname = usePathname();
  return (
    <div className="block mdl:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <HamburgerMenuIcon
            className={cn("size-10 ", {
              "text-orange80": pathname === "/",
            })}
          />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="flex flex-col gap-8 px-4 py-8 pb-20"
        >
          <SheetHeader>
            <SheetTitle className="bg-gradient-to-r from-orange80 to-orange60 bg-clip-text text-2xl font-bold text-transparent">
              Fedha Youth Group
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col  gap-4 ">
            {NavRoutes.map((navRoute: navRoutesInterface) => (
              <SheetClose key={navRoute.href} asChild>
                <Link
                  href={navRoute.href}
                  className={cn(
                    "translate-all bg-white translate-y-1 px-4 py-2  flex-col flex group rounded-sm bg-dark90-light20", // Added "group" class
                    {
                      "text-green100  ": pathname === navRoute.href,
                    }
                  )}
                >
                  <span className="text-xl">{navRoute.route}</span>
                  <span
                    className={cn(
                      " mx-auto w-0 h-1 rounded-full transition-all duration-300 ease-out group-hover:w-full",
                      {
                        "bg-green100 ": pathname === navRoute.href,
                        "bg-orange80 ": pathname !== navRoute.href,
                      }
                    )}
                  ></span>
                </Link>
              </SheetClose>
            ))}
          </div>
          <div className="mb-24 mt-auto flex flex-col gap-4">
            <SignedIn>
              <SheetClose
                asChild
                className="flex-1  rounded-md bg-orange10 px-4  py-3 text-xl font-semibold text-orange80  duration-200 hover:bg-orange80 hover:text-orange10  dark:bg-orange70 dark:text-white  dark:hover:bg-orange80"
              >
                <SignOutButton />
              </SheetClose>
            </SignedIn>

            <SignedOut>
              <SheetClose
                asChild
                className="flex-1  rounded-md bg-orange10 px-4  py-3 text-xl font-semibold text-orange80  duration-200 hover:bg-orange80 hover:text-orange10  dark:bg-orange70 dark:hover:bg-orange80 "
              >
                <SignInButton />
              </SheetClose>
            </SignedOut>

            <div className="flex flex-1 items-center justify-center text-xl">
              <SheetClose asChild>
                <ThemeToggle />
              </SheetClose>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
