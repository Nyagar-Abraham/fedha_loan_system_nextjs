"use client";

import React, { createContext, useContext, useState } from "react";

type BankContextTypes = {
  bankIds: string[];
  setBankIds: React.Dispatch<React.SetStateAction<string[]>>;
};

const BankContext = createContext<BankContextTypes | undefined>(undefined);

export function BankProvider({ children }: { children: React.ReactNode }) {
  const [bankIds, setBankIds] = useState<string[]>([]);

  return (
    <BankContext.Provider value={{ bankIds, setBankIds }}>
      {children}
    </BankContext.Provider>
  );
}

export function useBank() {
  const context = useContext(BankContext);

  if (!context) {
    throw new Error("BankContext used outside its bounds");
  }

  return context;
}
