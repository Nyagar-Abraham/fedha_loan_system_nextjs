/* eslint-disable no-unused-vars */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm, ControllerRenderProps } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { LoanName } from "@/constants";
import { toast, useToast } from "@/hooks/use-toast";
import { createLoanType } from "@/lib/actions/loanTypes.actions";
import { AddLoanFormSchema } from "@/utils/validations";

import SubmitButtom from "../SubmitButtom";
import FormFieldComp from "./FormFieldComp";
import Tag from "../Tag";
import { DialogFooter } from "../ui/dialog";
import Wrapper from "../Wrapper";
import FormlabelComp from "./FormlabelComp";
import { Input } from "../ui/input";

enum Fields {
  NAME = "name",
  INTRESTRATE = "intrestRate",
  MAXIMUMLOANAMOUNT = "maxLoanAmount",
  REPAYMENTPERIOD = "repaymentPeriod",
  ELIGIBILITYCRITERIA = "eligibilityCriteria",
  LOANPROCESSINGFEE = "loanProcessingFee",
  DOWNPAYMENT = "downPayment",
  VEHICLETYPE = "vehicleType",
  PROPERTYTYPE = "propertyType",
  MORATORIUMPERIOD = "moratoriumPeriod",
  COLLATERALREQUIRED = "collateralRequired",
  BUSINESSTYPE = "businessType",
}

enum Names {
  PERSONAL = "Personal Loan",
  MORTGAGE = "Mortgage Loan",
  CAR = "Car Loan",
  EDUCATION = "Education Loan",
  BUSINESS = "Business Loan",
}

export function AddLoanForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof AddLoanFormSchema>>({
    resolver: zodResolver(AddLoanFormSchema),
    defaultValues: {
      name: "",
      intrestRate: 0,
      maxLoanAmount: 0,
      repaymentPeriod: 0,
      eligibilityCriteria: [],
      loanProcessingFee: undefined,
      downPayment: undefined,
      vehicleType: undefined,
      propertyType: undefined,
      moratoriumPeriod: undefined,
      collateralRequired: undefined,
      businessType: undefined,
    },
  });

  console.log("name", form.getValues().name);

  const name = form.getValues().name;

  async function onSubmit(values: z.infer<typeof AddLoanFormSchema>) {
    console.log({ values });
    setIsSubmitting((cur) => !cur);

    try {
      const loan = await createLoanType(values);

      if (loan) {
        toast({
          title: "Loan created",

          duration: 5000,
        });
      } else {
        toast({
          title: "Error Creating Loan",
          variant: "destructive",
          duration: 5000,
        });
      }
    } catch (error) {
      console.log({ error });
    } finally {
      setIsSubmitting((cur) => !cur);
    }
  }

  const handleChange = (
    e: React.KeyboardEvent,
    field: ControllerRenderProps<any, string>
  ) => {
    if (e.key === "Enter" && field.name === Fields.ELIGIBILITYCRITERIA) {
      e.preventDefault();

      const inputField = e.target as HTMLInputElement;
      const value = inputField.value.trim();

      if (value !== "") {
        if (value.length > 100) {
          return form.setError(Fields.ELIGIBILITYCRITERIA, {
            type: "required",
            message: "creteria must be less than 100 characters.",
          });
        }

        if (!field?.value?.includes(value as never)) {
          form.setValue(Fields.ELIGIBILITYCRITERIA, [...field.value, value]);
          inputField.value = "";
          form.clearErrors(Fields.ELIGIBILITYCRITERIA);
        }
      } else {
        form.trigger();
      }
    }
  };

  const handleCriteriaRemove = (
    criteria: string,
    field: ControllerRenderProps<any, string>
  ) => {
    const newCriterias = field.value.filter((t: string) => t !== criteria);

    form.setValue(Fields.ELIGIBILITYCRITERIA, newCriterias);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-h-[80vh] space-y-4 overflow-y-scroll px-2 pb-6 hide-scrollbar "
      >
        <FormFieldComp
          name={Fields.NAME}
          label="Loan name"
          className=""
          placeholder="select loan name"
          isSelect
          selectItems={LoanName}
          form={form}
        />

        <FormField
          control={form.control}
          name={Fields.ELIGIBILITYCRITERIA}
          render={({ field }) => (
            <FormItem>
              <FormlabelComp label="eligibility criteria" />
              <FormControl>
                <>
                  <Input
                    placeholder="add criteria..."
                    className={`min-h-12 border-b-2 border-orange40 bg-dark20 text-xl hover:bg-dark10 focus:ring focus:ring-orange-400 dark:border-orange-950 dark:bg-dark80 dark:hover:bg-dark70 `}
                    onKeyDown={(e) => handleChange(e, field)}
                  />
                  <div className="flex gap-5">
                    {field?.value?.length > 0 &&
                      field.value?.map((value: string) => (
                        <Tag
                          item={value}
                          key={value}
                          onClick={() => handleCriteriaRemove(value, field)}
                        />
                      ))}
                  </div>
                </>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
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
            diabled={Names.CAR !== name}
            name={Fields.VEHICLETYPE}
            label="vehicle type "
            className=""
            form={form}
          />

          <FormFieldComp
            diabled={Names.MORTGAGE !== name}
            name={Fields.PROPERTYTYPE}
            label="property type "
            className=""
            form={form}
          />
        </Wrapper>
        <Wrapper className="gap-3  py-2 mdl:grid-cols-2">
          <FormFieldComp
            diabled={Names.EDUCATION !== name}
            name={Fields.MORATORIUMPERIOD}
            label="moratorium period "
            className=""
            form={form}
          />
          <FormFieldComp
            diabled={Names.BUSINESS !== name}
            name={Fields.BUSINESSTYPE}
            label="bussiness type"
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
