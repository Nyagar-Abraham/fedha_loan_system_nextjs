import React from "react";
import { UseFormReturn, ControllerRenderProps } from "react-hook-form";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface FormFieldProps {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  type?: "text" | "number" | "email" | "password";
  className?: string;
}

const FormFieldComp: React.FC<FormFieldProps> = ({
  form,
  name,
  label,
  placeholder = "",
  required = false,
  type = "text",
  className = "",
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }: { field: ControllerRenderProps<any, string> }) => (
        <FormItem className="flex flex-1 flex-col gap-2">
          <FormLabel className="text-[1.1rem] dark:text-orange10">
            {label}
            {required && <span className="text-orange70">*</span>}
          </FormLabel>
          <FormControl>
            <Input
              type={type}
              className={`min-h-12 border-b-2 border-orange40 bg-dark20 text-xl hover:bg-dark10 focus:ring focus:ring-orange-400 dark:border-orange-950 dark:bg-dark80 dark:hover:bg-dark70 ${className}`}
              placeholder={placeholder}
              value={field.value || ""}
              onChange={field.onChange}
            />
          </FormControl>
          <FormMessage className="text-red-500" />
        </FormItem>
      )}
    />
  );
};

export default FormFieldComp;
