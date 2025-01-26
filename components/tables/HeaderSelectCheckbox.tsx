import { Table, Row } from "@tanstack/react-table";

import { useBank, useSelectedFields } from "@/context/SelectedFieldsContext";
import { IBank } from "@/database/bank.model";
import { ILoanType } from "@/database/loanType.model";

import { Checkbox } from "../ui/checkbox";

const HeaderSelectCheckbox = ({
  table,
}: {
  table: Table<IBank | ILoanType>;
}) => {
  const { setBankIds, setLoanTypeIds } = useSelectedFields();
  const ids = table
    .getRowModel()
    .rows.map((row: Row<IBank | ILoanType>) => row.original._id as string);

  return (
    <Checkbox
      checked={
        table.getIsAllPageRowsSelected() ||
        (table.getIsSomePageRowsSelected() && "indeterminate")
      }
      onCheckedChange={(value) => {
        table.toggleAllPageRowsSelected(!!value);

        if (value) {
          setBankIds([...ids]);
        } else {
          setBankIds([]);
        }
      }}
      aria-label="Select all"
    />
  );
};

export default HeaderSelectCheckbox;
