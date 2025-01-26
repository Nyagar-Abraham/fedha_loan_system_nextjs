import { Row } from "@tanstack/react-table";
import React from "react";

import { useSelectedFields } from "@/context/SelectedFieldsContext";
import { IBank } from "@/database/bank.model";
import { ILoanType } from "@/database/loanType.model";

import { Checkbox } from "../ui/checkbox";

const SelectCheckBox = ({ row }: { row: Row<IBank | ILoanType> }) => {
  const { bankIds, loanTypeIds, setLoanTypeIds, setBankIds } =
    useSelectedFields();
  const type = row.original;
  console.log({ type });
  return (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => {
        row.toggleSelected(!!value);

        // if (!bankIds.includes(bank._id as string)) {
        //   setBankIds((bankIds) => [...bankIds, bank._id as string]);
        // } else {
        //   setBankIds((bankIds) =>
        //     bankIds.filter((bankId: string) => bankId !== (bank._id as string))
        //   );
        // }
      }}
      aria-label="Select row"
    />
  );
};

export default SelectCheckBox;
