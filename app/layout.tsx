import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import "./globals.css";
// eslint-disable-next-line camelcase
import { Josefin_Sans } from "next/font/google";
import React from "react";

import Header from "@/components/shared/Header";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

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
    <ClerkProvider
      appearance={{
        elements: {
          formButtonPrimary:
            "bg-gradient-to-br from-orange80 to-orange70 text-white  border-none",
          footerActionLink: "text-orange70 ",
          socialButtonsBlockButton: "text-dark10 bg-dark70 hover:bg-gray-600",
        },
        variables: {
          colorPrimary: "#e8590c", // Red color in hex format
          colorTextOnPrimaryBackground: "#ffffff", // White color in hex format
          colorBackground: "#212529", // Dark gray color in hex format
          colorInputBackground: "#495057",
          colorText: "#f1f3f5",
          colorNeutral: "#ced4da",
          colorTextSecondary: "#e9ecef",
        },
      }}
    >
      <html className="hide-scrollbar" lang="en">
        <body
          className={cn(
            "antialiased  flex flex-col flex-1 bg-dark100-light10 min-h-screen transition-all  relative ",
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

            <main className="mx-auto mt-[100px] flex w-full flex-1 flex-col  ">
              {children}
            </main>
          </ThemeProvider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
