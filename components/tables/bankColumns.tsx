"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BankTypeFields } from "@/constants/enums";
import { IBank } from "@/database/bank.model";

import HeaderSelectCheckbox from "./HeaderSelectCheckbox";
import SelectCheckBox from "./SelectCheckBox";
import Navigator from "../shared/Navigator";
import { Button } from "../ui/button";

export const bankColumns: ColumnDef<IBank>[] = [
  {
    id: "select",
    header: ({ table }) => <HeaderSelectCheckbox column="Bank" table={table} />,
    cell: ({ row }) => <SelectCheckBox column="Bank" row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: BankTypeFields.NAME,
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
    accessorKey: BankTypeFields.CONTACTEMAIL,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: BankTypeFields.BRANCHCODE,
    header: () => <div className="line-clamp-1">Branch Code</div>,
  },
  {
    accessorKey: BankTypeFields.HEADQUARTERS,
    header: () => <div className="line-clamp-1">Head Quarters</div>,
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const bank = row.original;

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
              name={"Bank"}
              value={bank._id as string}
              extendedPath="/edit"
            />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
