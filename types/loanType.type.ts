import { DraggableLocation } from "react-beautiful-dnd";

export interface CreateLoanTypeParams {
  params: {
    name: string;
    intrestRate: number;
    maxLoanAmount: number;
    repaymentPeriod: string;
    eligibilityCriteria: string[] | undefined;
    loanProcessingFee: number;
    downPayment: number | undefined;
    vehicleType: string | undefined;
    propertyType: string | undefined;
    moratoriumPeriod: string | undefined;
    collateralRequired: boolean;
    businessType: string | undefined;
  };
  path: string;
}

type onDragPayload = {
  source: DraggableLocation;
  destination: DraggableLocation;
};

export type LoanDragParams = { payload: onDragPayload; path: string };
