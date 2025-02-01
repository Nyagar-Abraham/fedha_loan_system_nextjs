/* eslint-disable no-unused-vars */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { ILoanType } from "@/database/loanType.model";

// import { LoanSchema } from "@/utils/validations";

import FormFieldComp from "./FormFieldComp";
import SubmitButtom from "../shared/SubmitButtom";
import Wrapper from "../shared/Wrapper";

enum Fields {
  AMOUNT = "amount",
  INTRESTRATE = "intrestRate",
  DURATIONMONTHS = "durationMonths",
  DATE = "date",
  GUARANTORS = "guarantors",
  BANK = "bank",
  COLLATERAL = "collateral",
  REMARKS = "remarks",
}

interface Bank {
  _id: unknown;
  name: string;
}

interface member {
  _id: unknown;
  name: string;
  clerkId: string;
  shares: number;
}

interface LoanFormProps {
  banks: Bank[];
  members: member[];
  loanType: ILoanType;
  userId: string;
}

export function LoanForm({ banks, members, loanType, userId }: LoanFormProps) {
  const LoanSchema = z.object({
    amount: z.number().min(0).max(loanType.maxLoanAmount),
    intrestRate: z.number(),
    durationMonths: z.number().min(0).max(parseFloat(loanType.repaymentPeriod)),
    date: z.date().min(new Date(), { message: "Date cannot be in the past" }),
    guarantors: z.array(z.string()).min(0),
    bank: z.string(),
    collateral: z.string(),
    remarks: z.string(),
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const form = useForm<z.infer<typeof LoanSchema>>({
    resolver: zodResolver(LoanSchema),
    defaultValues: {
      amount: 0,
      intrestRate: loanType.intrestRate || 0,
      durationMonths: 0,
      date: new Date(),
      guarantors: [],
      bank: "",
      collateral: "",
      remarks: "",
    },
  });

  const selectBanks = banks.map((bank) => {
    return { value: bank._id, label: bank.name };
  });
  const selectGuarantors = members.map((member) => {
    return { value: member._id, label: member.name };
  });

  function onSubmit(values: z.infer<typeof LoanSchema>) {
    setIsSubmitting(true);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-dark90-light20 space-y-4 rounded-sm  py-4"
      >
        <Wrapper className="gap-3  py-2 md:grid-cols-2">
          <FormFieldComp
            name={Fields.AMOUNT}
            form={form}
            label="amount"
            type="number"
          />
          <FormFieldComp
            name={Fields.INTRESTRATE}
            form={form}
            label="intrest rate"
            type="number"
          />
        </Wrapper>

        <FormFieldComp
          name={Fields.DURATIONMONTHS}
          form={form}
          label="duration in months"
          type="number"
        />
        <FormFieldComp
          name={Fields.DATE}
          form={form}
          label="application date"
          isDatepicker
        />

        <FormFieldComp
          name={Fields.COLLATERAL}
          form={form}
          label="collateral"
        />

        <Wrapper className="gap-3  py-2 md:grid-cols-2">
          <FormFieldComp
            name={Fields.GUARANTORS}
            form={form}
            label="select guarantors"
            isSelect
            selectItems={selectGuarantors}
          />
          <FormFieldComp
            name={Fields.BANK}
            form={form}
            label="select bank"
            isSelect
            selectItems={selectBanks}
          />{" "}
        </Wrapper>

        <div className="mt-6 flex justify-end">
          <SubmitButtom
            submitting={isSubmitting}
            className=""
            submitTxt="Apply"
            submittingTxt="Applying"
          />
        </div>
      </form>
    </Form>
  );
}
