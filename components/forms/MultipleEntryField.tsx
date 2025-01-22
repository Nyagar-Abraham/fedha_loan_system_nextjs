import { UseFormReturn, ControllerRenderProps } from "react-hook-form";

import FormlabelComp from "./FormlabelComp";
import Tag from "../shared/Tag";
import { FormField, FormItem, FormControl, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

interface MultipleEntryFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  form: UseFormReturn<any>;
  handleKeyDown: (
    e: React.KeyboardEvent,
    field: ControllerRenderProps<any, string>
  ) => void;
  handleRemove: (
    value: string,
    field: ControllerRenderProps<any, string>
  ) => void;
  disabled?: boolean;
}

const MultipleEntryField = ({
  name,
  form,
  label,
  placeholder,
  handleKeyDown,
  handleRemove,
  disabled = false,
}: MultipleEntryFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormlabelComp label={label} />
          <FormControl>
            <>
              <Input
                disabled={disabled}
                placeholder={placeholder}
                className={`min-h-12 border-b-2 border-orange40 bg-dark20 text-xl hover:bg-dark10 focus:ring focus:ring-orange-400 dark:border-orange-950 dark:bg-dark80 dark:hover:bg-dark70 `}
                onKeyDown={(e) => handleKeyDown(e, field)}
              />
              <div className="flex flex-wrap gap-5">
                {field?.value?.length > 0 &&
                  field.value?.map((value: string) => (
                    <Tag
                      item={value}
                      key={value}
                      onClick={() => handleRemove(value, field)}
                    />
                  ))}
              </div>
            </>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default MultipleEntryField;
