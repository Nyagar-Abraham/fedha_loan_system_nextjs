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
import { BankName } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import { createBank } from "@/lib/actions/bank.actions";
import { AddBankFormSchema } from "@/utils/validations";

import AppwriteDropZone from "./AppwriteDropZone";
import FormFieldComp from "./FormFieldComp";
import FormlabelComp from "./FormlabelComp";
import MultipleEntryField from "./MultipleEntryField";
import SubmitButtom from "../shared/SubmitButtom";
import Tag from "../shared/Tag";
import Wrapper from "../shared/Wrapper";
import { DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
import { ToastAction } from "../ui/toast";

enum Fields {
  NAME = "name",
  BRANCHCODE = "branchCode",
  HEADQUARTERS = "headquarters",
  ESTABLISHMENTYEAR = "establishedYear",
  SERVICES = "services",
  CONTACTEMAIL = "contactEmail",
  CONTACTPHONE = "contactPhone",
  WEBSITE = "website",
  LOGO = "logo",
}

export function BankForm() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [fileUrl, setFileUrl] = useState<string>();

  const { toast } = useToast();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof AddBankFormSchema>>({
    resolver: zodResolver(AddBankFormSchema),
    defaultValues: {
      name: "",
      branchCode: "",
      headquarters: "",
      establishedYear: "",
      services: [],
      contactEmail: "",
      contactPhone: "",
      website: "",
      logo: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof AddBankFormSchema>) {
    setIsSubmitting((cur) => !cur);
    values[Fields.LOGO] = fileUrl;

    console.log({ values });
    try {
      const bank = await createBank({ params: values, path: pathname });

      console.log("new bank", bank);

      form.clearErrors();
      form.reset();

      if (bank) {
        toast({
          title: "Bank Successfully created",
          description: "",
          duration: 3000,
        });
      }
    } catch (error) {
      console.log({ error });
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      setIsSubmitting((cur) => !cur);
    }
  }

  const handleKeyDown = (
    e: React.KeyboardEvent,
    field: ControllerRenderProps<any, string>
  ) => {
    if (e.key === "Enter" && field.name === Fields.SERVICES) {
      e.preventDefault();

      const inputField = e.target as HTMLInputElement;
      const value = inputField.value.trim();

      if (value !== "") {
        if (value.length > 100) {
          return form.setError(Fields.SERVICES, {
            type: "required",
            message: "service must be less than 100 characters.",
          });
        }

        if (!field?.value?.includes(value as never)) {
          form.setValue(Fields.SERVICES, [...field.value, value]);
          inputField.value = "";
          form.clearErrors(Fields.SERVICES);
        }
      } else {
        form.trigger();
      }
    }
  };

  const handleServiceRemove = (
    value: string,
    field: ControllerRenderProps<any, string>
  ) => {
    const newServices = field.value.filter((t: string) => t !== value);

    form.setValue(Fields.SERVICES, newServices);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-h-[80vh]  space-y-4 overflow-y-scroll px-2 pb-6 hide-scrollbar "
      >
        <Wrapper className="gap-3  py-2 mdl:grid-cols-2">
          <FormFieldComp
            name={Fields.NAME}
            label="bank name"
            placeholder="select bank name"
            isSelect
            selectItems={BankName}
            form={form}
          />

          <FormFieldComp
            name={Fields.BRANCHCODE}
            label="branchcode"
            placeholder="KCB001"
            form={form}
          />
        </Wrapper>
        <Wrapper className="gap-3 py-2 mdl:grid-cols-2">
          <FormFieldComp
            name={Fields.HEADQUARTERS}
            label="headquarters"
            placeholder="Nairobi, Kenya"
            form={form}
          />
          <FormFieldComp
            name={Fields.CONTACTEMAIL}
            label="contact email"
            placeholder="info@kcbgroup.com"
            form={form}
          />
        </Wrapper>

        <Wrapper className="gap-3  py-2 mdl:grid-cols-2">
          <FormFieldComp
            name={Fields.CONTACTPHONE}
            label="contact phone"
            placeholder="+254711087000"
            form={form}
          />

          <FormFieldComp
            name={Fields.ESTABLISHMENTYEAR}
            label="establishment year"
            placeholder="1996"
            form={form}
          />
        </Wrapper>

        <MultipleEntryField
          form={form}
          label="services"
          placeholder="press enter to add service..."
          name={Fields.SERVICES}
          disabled={isSubmitting}
          handleKeyDown={handleKeyDown}
          handleRemove={handleServiceRemove}
        />

        <FormFieldComp
          name={Fields.WEBSITE}
          label="website"
          placeholder="https://www.kcbgroup.com"
          form={form}
        />
        <div className="pt-5">
          <AppwriteDropZone setFileUrl={setFileUrl} />
        </div>

        <DialogFooter className="py-6">
          <SubmitButtom submitting={isSubmitting} />
        </DialogFooter>
      </form>
    </Form>
  );
}
