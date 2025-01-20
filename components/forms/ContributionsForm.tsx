"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { contributiontypes } from "@/constants";
import { ContributionSchema } from "@/utils/validations";

import FormFieldComp from "./FormFieldComp";
import FormlabelComp from "./FormlabelComp";
import SubmitButtom from "../shared/SubmitButtom";

enum Fields {
  NAME = "name",
  PHONE = "phone",
  AMOUNT = "amount",
  DATE = "date",
  TYPEOFCONTRIBUTION = "typeOfContribution",
}

export function ContributionsForm() {
  const form = useForm<z.infer<typeof ContributionSchema>>({
    resolver: zodResolver(ContributionSchema),
    defaultValues: {
      name: "",
      phone: "",
      amount: 0,
      date: new Date(),
      typeOfContribution: undefined,
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  function onSubmit(values: z.infer<typeof ContributionSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 px-2 py-4"
      >
        <FormFieldComp name={Fields.NAME} form={form} label="name" />
        <FormFieldComp name={Fields.PHONE} form={form} label="mpesa number" />
        <FormFieldComp name={Fields.AMOUNT} form={form} label="amount" />

        <FormFieldComp
          name={Fields.DATE}
          form={form}
          label="pick a date"
          isDatepicker={true}
        />

        <FormFieldComp
          name={Fields.TYPEOFCONTRIBUTION}
          form={form}
          label="choose type..."
          isRadioButton={true}
          radioItems={contributiontypes}
        />

        <SubmitButtom submitting={isSubmitting} className="w-full" />
      </form>
    </Form>
  );
}
