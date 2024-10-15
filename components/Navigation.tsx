"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import ThemeToggle from "./ThemeToggle";
import { usePathname } from "next/navigation";
import { NavRoutes } from "@/constants";
import { cn } from "@/lib/utils";
import { navRoutesInterface } from "@/lib/Interfaces";

const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav className="z-20 text-xl max-md:hidden">
      <ul className="flex items-center gap-8 text-orange90 hover:text-orange80">
        {NavRoutes.map((navRoute: navRoutesInterface) => (
          <li key={navRoute.href}>
            <Link
              href={navRoute.href}
              className={cn("translate-all px-4 py-2 rounded-sm", {
                "text-green100 border-b-2 border-green100 ":
                  pathname === navRoute.href,
              })}
            >
              {navRoute.route}
            </Link>
          </li>
        ))}

        <li
          className={cn(
            "border-2 border-orange90 text-orange90 px-4 py-2 font-semibold rounded-md hover:border-orange70 hover:text-orange70"
          )}
        >
          <SignedIn>
            <SignOutButton />
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </li>
        <li className="flex items-center justify-center gap-8">
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
