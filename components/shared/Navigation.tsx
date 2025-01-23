"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { NavRoutes } from "@/constants";
import { cn } from "@/lib/utils";
import { navRoutesInterface } from "@/utils/Interfaces";

import ThemeToggle from "./ThemeToggle";

const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav className="z-20 text-xl max-mdl:hidden">
      <ul className="flex items-center gap-4 text-orange90 hover:text-orange80 lg:gap-8">
        {NavRoutes.map((navRoute: navRoutesInterface) => (
          <li key={navRoute.href}>
            <Link
              href={navRoute.href}
              className={cn(
                "translate-all translate-y-1 px-4 py-2  flex-col flex group", // Added "group" class
                {
                  "text-green100  ": pathname === navRoute.href,
                }
              )}
            >
              <span className="">{navRoute.route}</span>
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
          </li>
        ))}

        <li className={cn("flex gap-3 items-center")}>
          <SignedIn>
            <div className="sign-in">
              <SignOutButton />
            </div>
          </SignedIn>

          <SignedOut>
            <div className="sign-in">
              <SignUpButton />{" "}
            </div>
          </SignedOut>

          <SignedOut>
            <div className="sign-in">
              <SignInButton />{" "}
            </div>
          </SignedOut>
        </li>
        <li className=" flex items-center justify-center gap-6">
          <ThemeToggle />
          <SignedIn>
            <UserButton />
          </SignedIn>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
