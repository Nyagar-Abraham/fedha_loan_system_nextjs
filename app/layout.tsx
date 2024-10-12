import type { Metadata } from "next";
// import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import React from "react";
// eslint-disable-next-line camelcase
import { Josefin_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: {
    template: "%s / Fedha Youth Group",
    default: "Welcome / Fedha Youth Group ",
  },
  description: "A student loan application",
};

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={cn(
            "antialiased dark:bg-slate-950 bg-slate-50 flex flex-col flex-1 text-slate-800 dark:text-slate-50 min-h-screen relative",
            josefin.className
          )}
        >
          {" "}
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <div className="mt-[76px] flex flex-1 flex-col  ">
              <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col pt-6">
                {children}
              </main>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
