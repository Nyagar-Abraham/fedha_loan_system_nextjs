"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { cn } from "@/lib/utils";
import icon from "@/public/fedha_logo.jpg";

const Logo = () => {
  const pathname = usePathname();

  return (
    <Link href="/" className="z-10 flex items-center gap-4">
      <Image
        quality={100}
        src={icon}
        height="60"
        width="60"
        alt="fedha youth group logo"
        className="aspect-square rounded-full"
      />

      <span
        className={cn("text-3xl font-bold text-orange100 max-md:hidden", {
          "text-green100": pathname === "/",
        })}
      >
        Fedha Youth Group
      </span>
    </Link>
  );
};

export default Logo;
