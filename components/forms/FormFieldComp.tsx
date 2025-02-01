/* eslint-disable @typescript-eslint/no-explicit-any */

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React from "react";
import { UseFormReturn, ControllerRenderProps } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

import FormlabelComp from "./FormlabelComp";
import { Checkbox } from "../ui/checkbox";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
interface SelectOrRadioItem {
  label: string;
  value: string | unknown;
}

interface FormFieldProps {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  type?: "text" | "number" | "email" | "password";
  className?: string;
  isCheckbox?: boolean;
  isSelect?: boolean;
  isDatepicker?: boolean;
  isRadioButton?: boolean;
  selectItems?: SelectOrRadioItem[];
  radioItems?: SelectOrRadioItem[];
  diabled?: boolean;
}

const FormFieldComp: React.FC<FormFieldProps> = ({
  form,
  name,
  label,
  placeholder = "",
  required = false,
  type = "text",
  className = "",
  isCheckbox = false,
  isSelect = false,
  isRadioButton = false,
  selectItems,
  radioItems,
  isDatepicker,
  diabled = false,
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }: { field: ControllerRenderProps<any, string> }) => (
        <FormItem className="flex flex-1 flex-col gap-2">
          <FormlabelComp label={label} />
          {isDatepicker ? (
            // DATE PICKER
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    disabled={diabled}
                    variant={"outline"}
                    className={cn(
                      "w-[240px] pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span className="text-red-300">Pick a date</span>
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
          ) : (
            // OTHERS
            <FormControl>
              {isCheckbox ? (
                // CHECKBOX
                <Checkbox
                  disabled={diabled}
                  className="border-orange80 data-[state=checked]:text-orange70"
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked);
                  }}
                  {...field}
                />
              ) : isRadioButton ? (
                // RADIO bUTTON
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col"
                  {...field}
                  disabled={diabled}
                >
                  {radioItems.map((item, i) => (
                    <FormItem
                      key={`${item.value}${i}`}
                      className={cn(`radio ${className}`)}
                    >
                      <FormControl>
                        <RadioGroupItem value={item.value} />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {item.label}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              ) : isSelect ? (
                // SELECT
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                  }}
                  {...field}
                  disabled={diabled}
                >
                  <SelectTrigger
                    className={cn(
                      `min-h-12 border-b-2 border-orange40 bg-dark20 text-xl hover:bg-dark10 focus:ring focus:ring-orange-400 dark:border-orange-950 dark:bg-dark80 dark:hover:bg-dark70 ${className}`
                    )}
                  >
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                  <SelectContent className="bg-dark20 text-[1rem] dark:bg-dark90 dark:hover:bg-dark80 ">
                    {selectItems.map((item, i) => (
                      <SelectItem
                        className="group items-center gap-3 text-base "
                        key={`${item.value}${i}`}
                        value={item.value}
                      >
                        <div className="flex gap-3">
                          {/* <Image
                          width={25}
                          height={25}
                          src={bank.logo}
                          className="rounded-lg object-cover "
                        /> */}
                          <span className="group-hover:text-orange70">
                            {item.label}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                // INPUT
                <Input
                  type={type}
                  className={`input ${className}`}
                  placeholder={placeholder}
                  {...field}
                  value={field.value || ""}
                  onChange={(e) => {
                    if (type === "number") {
                      field.onChange(Number(e.target.value));
                    } else {
                      field.onChange(e.target.value);
                    }
                  }}
                  disabled={diabled}
                />
              )}
            </FormControl>
          )}
          <FormMessage className="text-red-500" />
        </FormItem>
      )}
    />
  );
};

export default FormFieldComp;
