/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LoanTypeColumnFields } from "@/constants/enums";
import { ILoanType } from "@/database/loanType.model";
import { addPercentageSign, addShillingSign } from "@/lib/utils";

import HeaderSelectCheckbox from "./HeaderSelectCheckbox";
import SelectCheckBox from "./SelectCheckBox";
import Navigator from "../shared/Navigator";
import { Button } from "../ui/button";

export const loanTypeColumns: ColumnDef<ILoanType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      // @ts-expect-error

      <HeaderSelectCheckbox column="LoanType" table={table} />
    ),
    cell: ({ row }) => <SelectCheckBox column="LoanType" row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: LoanTypeColumnFields.NAME,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: LoanTypeColumnFields.INTRESTRATE,
    header: () => <div className="line-clamp-1">Intrest Rate</div>,
    cell: ({ row }) => {
      const amount = parseFloat(
        row.getValue(LoanTypeColumnFields.INTRESTRATE) ?? 0
      );
      const formatted = addPercentageSign(amount);

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: LoanTypeColumnFields.REPAYMENTPERIOD,
    header: () => <div className="line-clamp-1">Repayment Period</div>,
  },
  {
    accessorKey: LoanTypeColumnFields.LOANPROCESSINGFEE,
    header: () => <div className="line-clamp-1">Processing Fee</div>,
    cell: ({ row }) => {
      const amount = parseFloat(
        row.getValue(LoanTypeColumnFields.LOANPROCESSINGFEE) ?? 0
      );
      const formatted = addShillingSign(amount);

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: LoanTypeColumnFields.COLLATERALREQUIRED,
    header: () => <div className="line-clamp-1">collateral</div>,
    cell: ({ row }) => {
      const isRequired = row.getValue(LoanTypeColumnFields.COLLATERALREQUIRED);

      return (
        <div className="line-clamp-1">
          {isRequired ? "secured" : "unsequred"}
        </div>
      );
    },
  },
  {
    accessorKey: LoanTypeColumnFields.MAXIMUMLOANAMOUNT,
    header: ({ column }) => {
      return (
        <Button
          className="ml-auto line-clamp-1 flex gap-2"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Max Amount
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(
        row.getValue(LoanTypeColumnFields.MAXIMUMLOANAMOUNT) ?? 0
      );
      const formatted = addShillingSign(amount);

      return <div className="text-right">{formatted}</div>;
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const loanType = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="size-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-dark90-light20" align="end">
            <Navigator
              name={"LoanType"}
              value={loanType._id as string}
              extendedPath="/edit"
            />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
