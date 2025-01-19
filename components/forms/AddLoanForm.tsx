/* eslint-disable no-unused-vars */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { AddLoanFormSchema } from "@/utils/validations";

import SubmitButtom from "../SubmitButtom";
import FormFieldComp from "./FormFieldComp";
import { DialogFooter } from "../ui/dialog";
import Wrapper from "../Wrapper";

enum Fields {
  NAME = "name",
  INTRESTRATE = "intrestRate",
  MAXIMUMLOANAMOUNT = "maximumLoanAmount",
  REPAYMENTPERIOD = "repaymentPeriod",
  ELIGIBILITYCRITERIA = "eligibilityCriteria",
  LOANPROCESSINGFEE = "loanProcessingFee",
  DOWNPAYMENT = "downPayment",
  VEHICLETYPE = "vehicleType",
  PROPERTYTYPE = "propertyType",
  MORATORIUMPERIOD = "moratoriumPeriod",
  COLLATERALREQUIRED = "collateralRequired",
  BUSINESSTYPE = "businessType",
  LOANPURPOSE = "loanPurpose",
}

export function AddLoanForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof AddLoanFormSchema>>({
    resolver: zodResolver(AddLoanFormSchema),
    defaultValues: {
      name: "",
      intrestRate: 0,
      maximumLoanAmount: 0,
      repaymentPeriod: 0,
      eligibilityCriteria: [],
      loanProcessingFee: 0,
      downPayment: 0,
      vehicleType: "",
      propertyType: "",
      moratoriumPeriod: "",
      collateralRequired: false,
      businessType: "",
      loanPurpose: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  function onSubmit(values: z.infer<typeof AddLoanFormSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-h-[80vh] space-y-4 overflow-y-scroll px-2 pb-6 hide-scrollbar "
      >
        <FormFieldComp
          name={Fields.NAME}
          label=" Loan name"
          className=""
          form={form}
        />
        <FormFieldComp
          name={Fields.ELIGIBILITYCRITERIA}
          label="eligibility criteria"
          className=""
          form={form}
        />

        <Wrapper className="gap-3 py-3  md:grid-cols-3">
          <FormFieldComp
            name={Fields.INTRESTRATE}
            label="intrest rate"
            type="number"
            className=""
            form={form}
          />
          <FormFieldComp
            name={Fields.MAXIMUMLOANAMOUNT}
            label="maximum loan amount"
            type="number"
            className=""
            form={form}
          />
          <FormFieldComp
            name={Fields.REPAYMENTPERIOD}
            label="repayment period"
            type="number"
            className=""
            form={form}
          />
        </Wrapper>

        <Wrapper className="gap-3  py-2 md:grid-cols-2">
          <FormFieldComp
            name={Fields.LOANPROCESSINGFEE}
            label="Loan proccesing fee"
            type="number"
            className=""
            form={form}
          />

          <FormFieldComp
            name={Fields.DOWNPAYMENT}
            label="downpayment"
            type="number"
            className=""
            form={form}
          />
        </Wrapper>

        <Wrapper className="gap-3  py-2 mdl:grid-cols-2">
          <FormFieldComp
            name={Fields.VEHICLETYPE}
            label="vehicle type "
            className=""
            form={form}
          />

          <FormFieldComp
            name={Fields.PROPERTYTYPE}
            label="property type "
            className=""
            form={form}
          />
        </Wrapper>
        <Wrapper className="gap-3  py-2 mdl:grid-cols-2">
          <FormFieldComp
            name={Fields.MORATORIUMPERIOD}
            label="moratorium period "
            className=""
            form={form}
          />
          <FormFieldComp
            name={Fields.BUSINESSTYPE}
            label="bussiness type  "
            className=""
            form={form}
          />{" "}
        </Wrapper>

        <FormFieldComp
          name={Fields.COLLATERALREQUIRED}
          label="collateral required  "
          className=""
          isCheckbox={true}
          form={form}
        />

        <DialogFooter className="mt-2">
          <SubmitButtom submitting={isSubmitting} />
        </DialogFooter>
      </form>
    </Form>
  );
}
