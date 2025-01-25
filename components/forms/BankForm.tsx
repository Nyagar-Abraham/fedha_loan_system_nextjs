/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { useForm, ControllerRenderProps } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { BankName } from "@/constants";
import { BankTypeFields } from "@/constants/enums";
import { IBank } from "@/database/bank.model";
import { useToast } from "@/hooks/use-toast";
import { createBank, updateBank } from "@/lib/actions/bank.actions";
import { cn } from "@/lib/utils";
import { AddBankFormSchema } from "@/utils/validations";

import AppwriteDropZone from "./AppwriteDropZone";
import FormFieldComp from "./FormFieldComp";
import MultipleEntryField from "./MultipleEntryField";
import SubmitButtom from "../shared/SubmitButtom";
import Wrapper from "../shared/Wrapper";
import { DialogFooter } from "../ui/dialog";

export function BankForm({ edit, bank }: { edit?: boolean; bank?: IBank }) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [fileUrl, setFileUrl] = useState<string>();

  const { toast } = useToast();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof AddBankFormSchema>>({
    resolver: zodResolver(AddBankFormSchema),
    defaultValues: {
      name: bank?.name || "",
      branchCode: bank?.branchCode || "",
      headquarters: bank?.headquarters || "",
      establishedYear: bank?.establishedYear.toString() || "",
      services: bank?.services || [],
      contactEmail: bank?.contactEmail || "",
      contactPhone: bank?.contactPhone || "",
      website: bank?.website || "",
      logo: bank?.logo || undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof AddBankFormSchema>) {
    setIsSubmitting((cur) => !cur);
    values[BankTypeFields.LOGO] = fileUrl;

    try {
      if (!edit) {
        const bank = await createBank({ params: values, path: pathname });

        form.clearErrors();
        form.reset();

        if (bank) {
          toast({
            title: "Bank Successfully created",
            description: "",
            duration: 3000,
          });
        }
      } else {
        await updateBank({
          params: values,
          path: "/loans",
          bankId: bank?._id.toString(),
        });

        form.clearErrors();
        form.reset();

        toast({
          title: "Bank Successfully updated",
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
      });
    } finally {
      setIsSubmitting((cur) => !cur);
    }
  }

  const handleKeyDown = (
    e: React.KeyboardEvent,
    field: ControllerRenderProps<any, string>
  ) => {
    if (e.key === "Enter" && field.name === BankTypeFields.SERVICES) {
      e.preventDefault();

      const inputField = e.target as HTMLInputElement;
      const value = inputField.value.trim();

      if (value !== "") {
        if (value.length > 100) {
          return form.setError(BankTypeFields.SERVICES, {
            type: "required",
            message: "service must be less than 100 characters.",
          });
        }

        if (!field?.value?.includes(value as never)) {
          form.setValue(BankTypeFields.SERVICES, [...field.value, value]);
          inputField.value = "";
          form.clearErrors(BankTypeFields.SERVICES);
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

    form.setValue(BankTypeFields.SERVICES, newServices);
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
              Edit Bank
            </h1>
          </div>
        )}

        <Wrapper className="gap-3  py-2 mdl:grid-cols-2">
          <FormFieldComp
            name={BankTypeFields.NAME}
            label="bank name"
            placeholder="select bank name"
            isSelect
            selectItems={BankName}
            form={form}
          />

          <FormFieldComp
            name={BankTypeFields.BRANCHCODE}
            label="branchcode"
            placeholder="KCB001"
            form={form}
          />
        </Wrapper>
        <Wrapper className="gap-3 py-2 mdl:grid-cols-2">
          <FormFieldComp
            name={BankTypeFields.HEADQUARTERS}
            label="headquarters"
            placeholder="Nairobi, Kenya"
            form={form}
          />
          <FormFieldComp
            name={BankTypeFields.CONTACTEMAIL}
            label="contact email"
            placeholder="info@kcbgroup.com"
            form={form}
          />
        </Wrapper>
        <Wrapper className="gap-3  py-2 mdl:grid-cols-2">
          <FormFieldComp
            name={BankTypeFields.CONTACTPHONE}
            label="contact phone"
            placeholder="+254711087000"
            form={form}
          />

          <FormFieldComp
            name={BankTypeFields.ESTABLISHMENTYEAR}
            label="establishment year"
            placeholder="1996"
            form={form}
          />
        </Wrapper>

        <MultipleEntryField
          form={form}
          label="services"
          placeholder="press enter to add service..."
          name={BankTypeFields.SERVICES}
          disabled={isSubmitting}
          handleKeyDown={handleKeyDown}
          handleRemove={handleServiceRemove}
        />
        <FormFieldComp
          name={BankTypeFields.WEBSITE}
          label="website"
          placeholder="https://www.kcbgroup.com"
          form={form}
        />
        <div className="pt-5">
          <AppwriteDropZone setFileUrl={setFileUrl} />
        </div>

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
