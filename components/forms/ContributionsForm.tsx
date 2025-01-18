"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { contributiontypes } from "@/constants";
import { cn } from "@/lib/utils";
import { ContributiontypesInterface } from "@/utils/Interfaces";
import { ContributionSchema } from "@/utils/validations";

import FormlabelComp from "./FormlabelComp";
import SubmitButtom from "../SubmitButtom";

export function ContributionsForm() {
  const form = useForm<z.infer<typeof ContributionSchema>>({
    resolver: zodResolver(ContributionSchema),
    defaultValues: {
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
        {/* Amount */}
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="flex flex-1 flex-col gap-px">
              <FormlabelComp label="Amount" />
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

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormlabelComp label="Pick Date" />
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto size-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date: Date) =>
                      date <= new Date() || date > new Date("2030-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* type */}
        <FormField
          control={form.control}
          name="typeOfContribution"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormlabelComp label="Choose Type..." />
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col"
                >
                  {contributiontypes.map((type: ContributiontypesInterface) => (
                    <FormItem
                      key={type.type}
                      className="flex items-center space-x-3 space-y-0 rounded-md  border border-orange20/30 p-2 duration-200 hover:border-orange70 hover:text-orange70 dark:hover:border-orange70 "
                    >
                      <FormControl>
                        <RadioGroupItem value={type.type} />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {type.label}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButtom submitting={isSubmitting} className="w-full" />
      </form>
    </Form>
  );
}
