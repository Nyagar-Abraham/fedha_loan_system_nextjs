import { FormLabel } from "../ui/form";

const FormlabelComp = ({ label }: { label: string }) => {
  return (
    <FormLabel className="space-x-2 text-[1.1rem] capitalize dark:text-orange10">
      {label} <span className="text-orange70">*</span>
    </FormLabel>
  );
};

export default FormlabelComp;
