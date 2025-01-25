import { Table, Row } from "@tanstack/react-table";

import { useBank } from "@/context/BankContext";
import { IBank } from "@/database/bank.model";

import { Checkbox } from "../ui/checkbox";

const HeaderSelectCheckbox = ({ table }: { table: Table<IBank> }) => {
  const { setBankIds } = useBank();
  const ids = table
    .getRowModel()
    .rows.map((row: Row<IBank>) => row.original._id as string);

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
