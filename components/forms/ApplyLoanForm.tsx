"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { LoanSchema } from "@/lib/validations";
import { loanTypes } from "@/constants";
import { loanTypeInterface, MemberInterface } from "@/lib/Interfaces";

interface ApplyLoanInterface {
  userId: string;
  members: MemberInterface[];
}

export default function ApplyLoanForm({ userId, members }: ApplyLoanInterface) {
  console.log(userId);

  const form = useForm<z.infer<typeof LoanSchema>>({
    resolver: zodResolver(LoanSchema),
    defaultValues: {
      amount: 0,
      age: undefined,
      type: "",
      guarantors: [],
    },
  });

  function onSubmit(values: z.infer<typeof LoanSchema>) {
    console.log("Form Submitted", values);
  }

  // Handle value change and log the selected value
  const handleValueChange = (value: string, field: never) => {
    console.log("Selected Value:", value);
    console.log("Field Info:", field);

    // Update the form field's value using field.onChange
    // field.onChange(value);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" flex flex-col gap-5"
      >
        <div className="flex-between gap-8">
          {/* AMOUNT */}
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="flex flex-1 flex-col gap-px">
                <FormLabel className=" space-x-2 text-[1.1rem] dark:text-orange10">
                  Loan Amount<span className="text-orange70">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    className="min-h-12 border-b-2 border-orange40 bg-dark20 text-xl focus:ring focus:ring-orange-400 dark:border-orange-950 dark:bg-dark80 dark:hover:bg-dark70"
                    value={field.value || ""}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          {/* AGE */}
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem className="flex flex-1 flex-col gap-px">
                <FormLabel className=" space-x-2 text-[1.1rem] dark:text-orange10">
                  Enter Your Age<span className="text-orange70">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    className="min-h-12 border-b-2 border-orange40 bg-dark20 text-xl focus:ring focus:ring-orange-400 dark:border-orange-950 dark:bg-dark80 dark:hover:bg-dark70"
                    value={field.value || ""}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </div>
        {/* TYPE OF LOAN */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="flex flex-1 flex-col gap-px">
              <FormLabel className="space-x-2 text-[1.1rem] dark:text-orange10 ">
                Loan Type<span className="text-orange70">*</span>
              </FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    console.log("Loan Type Selected:", value); // Log the selected loan type
                    field.onChange(value);
                  }}
                >
                  <SelectTrigger className="min-h-12 border-b-2 border-orange40 bg-dark20 text-xl focus:ring focus:ring-orange-400 dark:border-orange-950 dark:bg-dark80 dark:hover:bg-dark70 ">
                    <SelectValue placeholder="Select loanType" />
                  </SelectTrigger>
                  <SelectContent className="bg-dark20 text-[1rem] dark:bg-dark90 dark:hover:bg-dark80 ">
                    {loanTypes.map((loanType: loanTypeInterface) => (
                      <SelectItem
                        className="text-base hover:text-orange50"
                        key={loanType.value}
                        value={loanType.value}
                      >
                        {loanType.category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        {/* GUARANTORS */}
        <FormField
          control={form.control}
          name="guarantors"
          render={({ field }) => (
            <FormItem className="flex flex-1 flex-col gap-px">
              <FormLabel className="space-x-2 text-[1.1rem] dark:text-orange10 ">
                Select Guarantors<span className="text-orange70">*</span>
              </FormLabel>
              <FormControl>
                <Select
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-expect-error
                  onValueChange={(value) => handleValueChange(value, field)}
                >
                  <SelectTrigger className="min-h-12 border-b-2 border-orange40  bg-dark20 text-xl focus:ring focus:ring-orange-400 dark:border-orange-950 dark:bg-dark80 dark:hover:bg-dark70 ">
                    <SelectValue placeholder="Select A Guarantor" />
                  </SelectTrigger>
                  <SelectContent className="bg-dark20 text-[1rem] dark:bg-dark90 dark:hover:bg-dark80 ">
                    {members.map((member: MemberInterface) => (
                      <SelectItem
                        className="text-base hover:text-orange50"
                        key={member.clerkId}
                        value={member.clerkId}
                      >
                        {member.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        {/* SUBMIT */}
        <div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
