export interface CreateLoanTypeParams {
  name: string;
  intrestRate: number;
  maximumLoanAmount: number;
  repaymentPeriod: number;
  eligibilityCriteria: string[] | undefined;
  loanProcessingFee: number;
  downPayment: number | undefined;
  vehicleType: string | undefined;
  propertyType: string | undefined;
  moratoriumPeriod: string | undefined;
  collateralRequired: boolean;
  businessType: string | undefined;
}
