/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation";
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
import {
  businessType,
  LoanName,
  moratoriumPeriods,
  propertyType,
  vehicleType,
} from "@/constants";
import { LoanTypeFields } from "@/constants/enums";
import { ILoanType } from "@/database/loanType.model";
import { useToast } from "@/hooks/use-toast";
import {
  createLoanType,
  updateLoanType,
} from "@/lib/actions/loanTypes.actions";
import { cn } from "@/lib/utils";
import { LoanTypeFormSchema } from "@/utils/validations";

import FormFieldComp from "./FormFieldComp";
import FormlabelComp from "./FormlabelComp";
import SubmitButtom from "../shared/SubmitButtom";
import Tag from "../shared/Tag";
import Wrapper from "../shared/Wrapper";
import { DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";

enum Names {
  PERSONAL = "Personal Loan",
  MORTGAGE = "Mortgage Loan",
  CAR = "Car Loan",
  EDUCATION = "Education Loan",
  BUSINESS = "Business Loan",
}

export function LoanTypeForm({
  edit,
  loanType,
}: {
  edit?: boolean;
  loanType?: ILoanType;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof LoanTypeFormSchema>>({
    resolver: zodResolver(LoanTypeFormSchema),
    defaultValues: {
      name: loanType?.name || "",
      intrestRate: loanType?.intrestRate || 0,
      maxLoanAmount: loanType?.maxLoanAmount || 0,
      repaymentPeriod: loanType?.repaymentPeriod || "",
      eligibilityCriteria: loanType?.eligibilityCriteria || [],
      loanProcessingFee: loanType?.loanProcessingFee || undefined,
      downPayment: loanType?.downPayment || undefined,
      vehicleType: loanType?.vehicleType || undefined,
      propertyType: loanType?.propertyType || undefined,
      moratoriumPeriod: loanType?.moratoriumPeriod || undefined,
      collateralRequired: loanType?.collateralRequired || false,
      businessType: loanType?.businesstype || undefined,
    },
  });

  console.log("name", form.getValues().name);

  const name = form.getValues().name;

  async function onSubmit(values: z.infer<typeof LoanTypeFormSchema>) {
    setIsSubmitting((cur) => !cur);

    try {
      if (!edit) {
        const loan = await createLoanType({
          params: {
            name: values.name.trim(),
            intrestRate: values.intrestRate,
            maxLoanAmount: values.maxLoanAmount,
            repaymentPeriod: values.repaymentPeriod.trim(),
            eligibilityCriteria: values.eligibilityCriteria,
            loanProcessingFee: values.loanProcessingFee,
            downPayment: values.downPayment,
            vehicleType: values.vehicleType,
            propertyType: values.propertyType,
            moratoriumPeriod: values.moratoriumPeriod,
            collateralRequired: values.collateralRequired,
            businessType: values.businessType,
          },
          path: pathname,
        });

        form.clearErrors();
        form.reset();

        if (loan) {
          toast({
            title: "Loan Successfully created",
            description: "",
            duration: 3000,
          });
        }
      } else {
        const loan = await updateLoanType({
          params: values,
          path: pathname,
          loanTypeId: loanType._id as string,
        });

        form.clearErrors();
        form.reset();

        if (loan) {
          toast({
            title: "Loan Successfully updated",
            description: "",
            duration: 3000,
          });
        }
      }
    } catch (error) {
      console.log({ error });
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleChange = (
    e: React.KeyboardEvent,
    field: ControllerRenderProps<any, string>
  ) => {
    if (
      e.key === "Enter" &&
      field.name === LoanTypeFields.ELIGIBILITYCRITERIA
    ) {
      e.preventDefault();

      const inputField = e.target as HTMLInputElement;
      const value = inputField.value.trim();

      if (value !== "") {
        if (value.length > 100) {
          return form.setError(LoanTypeFields.ELIGIBILITYCRITERIA, {
            type: "required",
            message: "creteria must be less than 100 characters.",
          });
        }

        if (!field?.value?.includes(value as never)) {
          form.setValue(LoanTypeFields.ELIGIBILITYCRITERIA, [
            ...field.value,
            value,
          ]);
          inputField.value = "";
          form.clearErrors(LoanTypeFields.ELIGIBILITYCRITERIA);
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

    form.setValue(LoanTypeFields.ELIGIBILITYCRITERIA, newCriterias);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          `  space-y-4 px-2 pb-6  ${edit ? "" : "hide-scrollbar overflow-y-scroll max-h-[80vh]"} `
        )}
      >
        {edit && (
          <div className="mb-4">
            <h1 className=" mt-3  text-4xl font-semibold text-orange90">
              Edit LoanType
            </h1>
          </div>
        )}

        <FormFieldComp
          name={LoanTypeFields.NAME}
          label="Loan name"
          className=""
          placeholder="select loan name"
          isSelect
          selectItems={LoanName}
          form={form}
        />

        <FormField
          control={form.control}
          name={LoanTypeFields.ELIGIBILITYCRITERIA}
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
            name={LoanTypeFields.INTRESTRATE}
            label="intrest rate"
            type="number"
            className=""
            form={form}
          />
          <FormFieldComp
            name={LoanTypeFields.MAXIMUMLOANAMOUNT}
            label="maximum loan amount"
            type="number"
            className=""
            form={form}
          />
          <FormFieldComp
            name={LoanTypeFields.REPAYMENTPERIOD}
            label="repayment period"
            placeholder="5 years"
            className=""
            form={form}
          />
        </Wrapper>

        <Wrapper className="gap-3  py-2 md:grid-cols-2">
          <FormFieldComp
            name={LoanTypeFields.LOANPROCESSINGFEE}
            label="Loan proccesing fee"
            type="number"
            className=""
            form={form}
          />

          <FormFieldComp
            name={LoanTypeFields.DOWNPAYMENT}
            label="downpayment"
            type="number"
            className=""
            form={form}
          />
        </Wrapper>

        <Wrapper className="gap-3  py-2 mdl:grid-cols-2">
          <FormFieldComp
            diabled={Names.CAR !== name}
            name={LoanTypeFields.VEHICLETYPE}
            label="vehicle type "
            isSelect
            selectItems={vehicleType}
            placeholder="select vehicle type"
            form={form}
          />

          <FormFieldComp
            diabled={Names.MORTGAGE !== name}
            name={LoanTypeFields.PROPERTYTYPE}
            label="property type "
            isSelect
            selectItems={propertyType}
            placeholder="select property type"
            form={form}
          />
        </Wrapper>
        <Wrapper className="gap-3  py-2 mdl:grid-cols-2">
          <FormFieldComp
            diabled={Names.EDUCATION !== name}
            name={LoanTypeFields.MORATORIUMPERIOD}
            label="moratorium period "
            placeholder="6 years after graduation"
            isSelect
            selectItems={moratoriumPeriods}
            form={form}
          />
          <FormFieldComp
            diabled={Names.BUSINESS !== name}
            name={LoanTypeFields.BUSINESSTYPE}
            label="bussiness type"
            isSelect
            selectItems={businessType}
            placeholder="select bussiness type"
            form={form}
          />{" "}
        </Wrapper>

        <FormFieldComp
          name={LoanTypeFields.COLLATERALREQUIRED}
          label="collateral required"
          className=""
          isCheckbox={true}
          form={form}
        />

        {edit ? (
          <div className="flex justify-end py-6">
            <SubmitButtom
              submitting={isSubmitting}
              submitTxt="Update"
              submittingTxt="Updating..."
            />
          </div>
        ) : (
          <DialogFooter className="py-6">
            <SubmitButtom
              submitting={isSubmitting}
              submitTxt="Create"
              submittingTxt="Creating..."
            />
          </DialogFooter>
        )}
      </form>
    </Form>
  );
}
