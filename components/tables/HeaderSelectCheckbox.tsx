import { Table, Row } from "@tanstack/react-table";

import { useSelectedFields } from "@/context/SelectedFieldsContext";
import { IBank } from "@/database/bank.model";
import { ILoanType } from "@/database/loanType.model";

import { Checkbox } from "../ui/checkbox";

const HeaderSelectCheckbox = ({
  table,
  column,
}: {
  table: Table<IBank | ILoanType>;
  column: "Bank" | "LoanType";
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

        switch (column) {
          case "Bank":
            if (value) {
              setBankIds([...ids]);
            } else {
              setBankIds([]);
            }
            break;
          case "LoanType":
            if (value) {
              setLoanTypeIds([...ids]);
            } else {
              setLoanTypeIds([]);
            }
            break;
          default:
            break;
        }
      }}
      aria-label="Select all"
    />
  );
};

export default HeaderSelectCheckbox;
