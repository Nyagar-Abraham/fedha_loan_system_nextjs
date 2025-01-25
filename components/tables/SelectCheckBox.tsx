import { Row } from "@tanstack/react-table";
import React from "react";

import { useBank } from "@/context/BankContext";
import { IBank } from "@/database/bank.model";

import { Checkbox } from "../ui/checkbox";

const SelectCheckBox = ({ row }: { row: Row<IBank> }) => {
  const { bankIds, setBankIds } = useBank();
  const bank = row.original;
  return (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => {
        row.toggleSelected(!!value);

        if (!bankIds.includes(bank._id as string)) {
          setBankIds((bankIds) => [...bankIds, bank._id as string]);
        } else {
          setBankIds((bankIds) =>
            bankIds.filter((bankId: string) => bankId !== (bank._id as string))
          );
        }
      }}
      aria-label="Select row"
    />
  );
};

export default SelectCheckBox;
