"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import icon from "@/public/fedha_logo.jpg";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

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
        className={cn("text-3xl font-bold text-rose-800 max-md:hidden", {
          "text-green-700": pathname === "/",
        })}
      >
        Fedha Youth Group
      </span>
    </Link>
  );
};

export default Logo;