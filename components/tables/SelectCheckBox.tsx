import { Row } from "@tanstack/react-table";
import React from "react";

import { useSelectedFields } from "@/context/SelectedFieldsContext";
import { IBank } from "@/database/bank.model";
import { ILoanType } from "@/database/loanType.model";

import { Checkbox } from "../ui/checkbox";

const SelectCheckBox = ({
  row,
  column,
}: {
  row: Row<IBank | ILoanType>;
  column: "Bank" | "LoanType";
}) => {
  const { bankIds, loanTypeIds, setLoanTypeIds, setBankIds } =
    useSelectedFields();
  const doc = row.original;

  return (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => {
        row.toggleSelected(!!value);

        switch (column) {
          case "Bank":
            if (!bankIds.includes(doc._id as string)) {
              setBankIds((bankIds) => [...bankIds, doc._id as string]);
            } else {
              setBankIds((bankIds) =>
                bankIds.filter(
                  (bankId: string) => bankId !== (doc._id as string)
                )
              );
            }
            break;
          case "LoanType":
            if (!loanTypeIds.includes(doc._id as string)) {
              setLoanTypeIds((loanTypeIds) => [
                ...loanTypeIds,
                doc._id as string,
              ]);
            } else {
              setLoanTypeIds((loanTypeIds) =>
                loanTypeIds.filter(
                  (loanTypeId: string) => loanTypeId !== (doc._id as string)
                )
              );
            }
            break;

          default:
            break;
        }
      }}
      aria-label="Select row"
    />
  );
};

export default SelectCheckBox;
