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
import { toast, useToast } from "@/hooks/use-toast";
import { createLoanType } from "@/lib/actions/loanTypes.actions";
import { AddBankFormSchema } from "@/utils/validations";

import FormFieldComp from "./FormFieldComp";
import FormlabelComp from "./FormlabelComp";
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
  AVATAR = "avatar",
}

export function BankForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      avatar: "",
    },
  });

  async function onSubmit(values: z.infer<typeof AddBankFormSchema>) {
    setIsSubmitting((cur) => !cur);
    console.log(values);
    try {
      toast({
        title: "Loan Successfully created",
        description: "",
        duration: 3000,
      });
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

  const handleChange = (
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
    service: string,
    field: ControllerRenderProps<any, string>
  ) => {
    const newServices = field.value.filter((t: string) => t !== service);

    form.setValue(Fields.SERVICES, newServices);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-h-[80vh] space-y-4 overflow-y-scroll px-2 pb-6 hide-scrollbar "
      >
        <Wrapper className="gap-3  py-2 mdl:grid-cols-2">
          <FormFieldComp
            name={Fields.NAME}
            label="bank name"
            className=""
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
        <Wrapper className="gap-3  py-2 mdl:grid-cols-2">
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

        <FormField
          control={form.control}
          name={Fields.SERVICES}
          render={({ field }) => (
            <FormItem>
              <FormlabelComp label="services provided" />
              <FormControl>
                <>
                  <Input
                    placeholder="add sercice..."
                    className={`min-h-12 border-b-2 border-orange40 bg-dark20 text-xl hover:bg-dark10 focus:ring focus:ring-orange-400 dark:border-orange-950 dark:bg-dark80 dark:hover:bg-dark70 `}
                    onKeyDown={(e) => handleChange(e, field)}
                  />
                  <div className="flex gap-5">
                    {field?.value?.length > 0 &&
                      field.value?.map((value: string) => (
                        <Tag
                          item={value}
                          key={value}
                          onClick={() => handleServiceRemove(value, field)}
                        />
                      ))}
                  </div>
                </>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormFieldComp
          name={Fields.WEBSITE}
          label="website"
          placeholder="https://www.kcbgroup.com"
          form={form}
        />

        <DialogFooter className="pt-6">
          <SubmitButtom submitting={isSubmitting} />
        </DialogFooter>
      </form>
    </Form>
  );
}
