/* eslint-disable no-unused-vars */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AddLoanFormSchema } from "@/utils/validations";

import SubmitButtom from "../SubmitButtom";
import FormFieldComp from "./FormFieldComp";
import { Checkbox } from "../ui/checkbox";
import { DialogFooter } from "../ui/dialog";

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
        className="space-y-4 overflow-y-scroll px-2 hide-scrollbar "
      >
        {/* name */}
        <FormFieldComp
          name={Fields.NAME}
          label=" Loan name"
          className=""
          form={form}
        />

        {/* category */}
        <FormFieldComp
          name={Fields.INTRESTRATE}
          label="intrest rate"
          type="number"
          className=""
          form={form}
        />
        {/* maximumAmount */}
        <FormFieldComp
          name={Fields.MAXIMUMLOANAMOUNT}
          label="maximum loan amount"
          type="number"
          className=""
          form={form}
        />
        {/* repayment period */}
        <FormFieldComp
          name={Fields.REPAYMENTPERIOD}
          label="repayment period"
          type="number"
          className=""
          form={form}
        />
        {/* eligibility criteria */}
        <FormFieldComp
          name={Fields.ELIGIBILITYCRITERIA}
          label="eligibility criteria"
          className=""
          form={form}
        />
        {/* Loan proccesing fee */}
        <FormFieldComp
          name={Fields.LOANPROCESSINGFEE}
          label="Loan proccesing fee"
          type="number"
          className=""
          form={form}
        />
        {/* downpayment */}
        <FormFieldComp
          name={Fields.DOWNPAYMENT}
          label="downpayment"
          type="number"
          className=""
          form={form}
        />
        {/* vehicle type */}
        <FormFieldComp
          name={Fields.VEHICLETYPE}
          label="vehicle type "
          className=""
          form={form}
        />
        {/* property type */}
        <FormFieldComp
          name={Fields.PROPERTYTYPE}
          label="property type "
          className=""
          form={form}
        />
        {/*  moratorium period */}
        <FormFieldComp
          name={Fields.MORATORIUMPERIOD}
          label="moratorium period "
          className=""
          form={form}
        />
        {/* bussiness type */}
        <FormFieldComp
          name={Fields.BUSINESSTYPE}
          label="bussiness type  "
          className=""
          form={form}
        />
        <div className="flex gap-4">
          {/* TYPE OF BANK */}
          {/* <FormField
            control={form.control}
            name="bank"
            render={({ field }) => (
              <FormItem className="flex flex-1 flex-col gap-px">
                <FormLabel className="space-x-2 text-[1.1rem] dark:text-orange10 ">
                  Select Bank<span className="text-orange70">*</span>
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      console.log("bank Selected:", value); // Log the selected loan type
                      field.onChange(`${value} Bank`);
                    }}
                  >
                    <SelectTrigger className="min-h-12 border-b-2 border-orange40 bg-dark20 text-xl hover:bg-dark10 focus:ring focus:ring-orange-400 dark:border-orange-950 dark:bg-dark80 dark:hover:bg-dark70">
                      <SelectValue placeholder="Select loanType" />
                    </SelectTrigger>
                    <SelectContent className="bg-dark20 text-[1rem] dark:bg-dark90 dark:hover:bg-dark80 ">
                      {banks.map((bank: BankInterface) => (
                        <SelectItem
                          className=" items-center gap-3 text-base hover:text-orange50"
                          key={bank.name}
                          value={bank.name}
                        >
                          <div className="flex gap-3">
                            <Image
                              width={25}
                              height={25}
                              src={bank.logo}
                              className="rounded-lg object-cover "
                            />
                            <span> {bank.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          /> */}
          {/*  monthlyInstallment */}
          <FormField
            control={form.control}
            name={Fields.COLLATERALREQUIRED}
            render={({ field }) => (
              <FormItem className="flex flex-1 flex-col gap-px">
                <FormLabel className=" space-x-2 text-[1.1rem] dark:text-orange10">
                  collateral requred<span className="text-orange70">*</span>
                </FormLabel>

                <FormControl className="flex items-center">
                  <Checkbox {...field} className="" />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </div>

        <DialogFooter className="mt-2">
          <SubmitButtom submitting={isSubmitting} />
        </DialogFooter>
      </form>
    </Form>
  );
}
