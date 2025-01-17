"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { banks } from "@/constants";
import { BankInterface } from "@/utils/Interfaces";
import { AddLoanFormSchema } from "@/utils/validations";

import { Checkbox } from "../ui/checkbox";
import { DialogFooter } from "../ui/dialog";

// {
//   id: "normal",
//   category: "Normal Loan",
//   value: "Normal",
//   maximumAmount: "3x shares amount",
//   interestRate: 0.01,
//   repaymentPeriod: 3,
//   monthlyInstallment: "4% of loan",
//   bank: "Commercial Bank",
//   logo: commercialLogo,
//   isRecommended: false,
// },

export function AddLoanForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof AddLoanFormSchema>>({
    resolver: zodResolver(AddLoanFormSchema),
    defaultValues: {
      name: "",
      category: "",
      maximumAmount: "",
      intrestRate: 0,
      repaymentPeriod: 0,
      monthlyInstallment: "",
      bank: undefined,
      isRecommended: false,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof AddLoanFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-1 flex-col gap-px">
              <FormLabel className=" space-x-2 text-[1.1rem] dark:text-orange10">
                Loan name<span className="text-orange70">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className=" min-h-12 border-b-2 border-orange40 bg-dark20 text-xl hover:bg-dark10 focus:ring focus:ring-orange-400 dark:border-orange-950 dark:bg-dark80 dark:hover:bg-dark70"
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e)}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        {/* category */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="flex flex-1 flex-col gap-px">
              <FormLabel className=" space-x-2 text-[1.1rem] dark:text-orange10">
                Loan Category<span className="text-orange70">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className=" min-h-12 border-b-2 border-orange40 bg-dark20 text-xl hover:bg-dark10 focus:ring focus:ring-orange-400 dark:border-orange-950 dark:bg-dark80 dark:hover:bg-dark70"
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e)}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        {/* maximumAmount */}
        <FormField
          control={form.control}
          name="maximumAmount"
          render={({ field }) => (
            <FormItem className="flex flex-1 flex-col gap-px">
              <FormLabel className=" space-x-2 text-[1.1rem] dark:text-orange10">
                Loan maximumAmount<span className="text-orange70">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="3x shares amount"
                  className=" min-h-12 border-b-2 border-orange40 bg-dark20 text-xl hover:bg-dark10 focus:ring focus:ring-orange-400 dark:border-orange-950 dark:bg-dark80 dark:hover:bg-dark70"
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e)}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          {/* interest rate */}
          <FormField
            control={form.control}
            name="intrestRate"
            render={({ field }) => (
              <FormItem className="flex flex-1 flex-col gap-px">
                <FormLabel className=" space-x-2 text-[1.1rem] dark:text-orange10">
                  IntrestRate<span className="text-orange70">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="0.01"
                    type="number"
                    className=" min-h-12 border-b-2 border-orange40 bg-dark20 text-xl hover:bg-dark10 focus:ring focus:ring-orange-400 dark:border-orange-950 dark:bg-dark80 dark:hover:bg-dark70"
                    value={field.value || ""}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          {/* repaymentPeriod */}
          <FormField
            control={form.control}
            name="repaymentPeriod"
            render={({ field }) => (
              <FormItem className="flex flex-1 flex-col gap-px">
                <FormLabel className=" space-x-2 text-[1.1rem] dark:text-orange10">
                  repayment Period <span className="text-orange70">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    className=" min-h-12 border-b-2 border-orange40 bg-dark20 text-xl hover:bg-dark10 focus:ring focus:ring-orange-400 dark:border-orange-950 dark:bg-dark80 dark:hover:bg-dark70"
                    value={field.value || ""}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-4">
          {/* TYPE OF BANK */}
          <FormField
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
          />
          {/*  monthlyInstallment */}
          <FormField
            control={form.control}
            name="monthlyInstallment"
            render={({ field }) => (
              <FormItem className="flex flex-1 flex-col gap-px">
                <FormLabel className=" space-x-2 text-[1.1rem] dark:text-orange10">
                  monthly Installments<span className="text-orange70">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="4% of loan"
                    className=" min-h-12 border-b-2 border-orange40 bg-dark20 text-xl hover:bg-dark10 focus:ring focus:ring-orange-400 dark:border-orange-950 dark:bg-dark80 dark:hover:bg-dark70"
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e)}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </div>
        {/* isReccommended */}
        <FormField
          control={form.control}
          name="isRecommended"
          render={({ field }) => (
            <FormItem className="flex flex-1  items-center  gap-2">
              <FormLabel className=" space-x-2 text-[1.1rem] dark:text-orange10">
                IsRecommended<span className="text-orange70">*</span>
              </FormLabel>
              <FormControl className="flex items-center">
                <Checkbox {...field} className="" />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <DialogFooter className="mt-2">
          <Button
            className="bg-green80 text-xl text-white  hover:bg-green90"
            type="submit"
          >
            Submit
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
