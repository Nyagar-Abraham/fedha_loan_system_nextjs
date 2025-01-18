"use client";

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

import { loanTypes } from "@/constants";
import { LoanAction, LoanBoard, loanTypeInterface } from "@/utils/Interfaces";

const loanInitialState: LoanBoard = {
  loans: loanTypes,
  order: loanTypes.map((loan: loanTypeInterface) => loan.id),
};

const LoanContext = createContext({
  LoanState: loanInitialState,
  // @ts-ignore
  dispatch: (action: LoanAction) => {},
});

export const LoanProvider = ({ children }: { children: React.ReactNode }) => {
  const [LoanState, dispatch] = useReducer(loansReducer, loanInitialState);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    const localLoanData = localStorage.getItem("@Loans");

    if (localLoanData === null) {
      localStorage.setItem("@Loans", JSON.stringify(loanInitialState));
    } else {
      const dataObject = JSON.parse(localLoanData);
      dispatch({ type: "SET_LOANS", payload: dataObject });
    }
    setLoading(false);
  }

  if (loading) return;

  return (
    <LoanContext.Provider value={{ LoanState, dispatch }}>
      {children}
    </LoanContext.Provider>
  );
};

export function useLoan() {
  const context = useContext(LoanContext);
  if (context === undefined) {
    throw new Error("context used outside its bounds");
  }
  return context;
}

function loansReducer(state: LoanBoard, action: LoanAction): LoanBoard {
  switch (action.type) {
    case "SET_LOANS": {
      return action.payload;
    }
    case "MOVE_LOAN": {
      const newLoanList = [...state.loans];

      const [movedLoan] = newLoanList.splice(action.payload.source.index, 1);
      newLoanList.splice(action.payload.destination.index, 0, movedLoan);

      const newLoanState = {
        ...state,
        loans: newLoanList,
        order: newLoanList.map((loan: loanTypeInterface) => loan.id),
      };

      localStorage.setItem("@Loans", JSON.stringify(newLoanState));

      return newLoanState;
    }
    default: {
      return loanInitialState;
    }
  }
}
