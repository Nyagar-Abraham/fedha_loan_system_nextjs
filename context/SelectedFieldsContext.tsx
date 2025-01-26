"use client";

import React, { createContext, useContext, useState } from "react";

type SelectedFieldsContextTypes = {
  bankIds: string[];
  loanTypeIds: string[];
  setBankIds: React.Dispatch<React.SetStateAction<string[]>>;
  setLoanTypeIds: React.Dispatch<React.SetStateAction<string[]>>;
};

const SelectedFieldsContext = createContext<
  SelectedFieldsContextTypes | undefined
>(undefined);

export function SelectedFieldsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [bankIds, setBankIds] = useState<string[]>([]);
  const [loanTypeIds, setLoanTypeIds] = useState<string[]>([]);

  return (
    <SelectedFieldsContext.Provider
      value={{ bankIds, loanTypeIds, setBankIds, setLoanTypeIds }}
    >
      {children}
    </SelectedFieldsContext.Provider>
  );
}

export function useSelectedFields() {
  const context = useContext(SelectedFieldsContext);

  if (!context) {
    throw new Error("SelectedFieldsContext used outside its bounds");
  }

  return context;
}
