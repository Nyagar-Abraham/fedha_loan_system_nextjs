"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Delete, Edit, MoreHorizontal } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BankTypeFields } from "@/constants/enums";
import { IBank } from "@/database/bank.model";

import { Button } from "../ui/button";

export const bankColumns: ColumnDef<IBank>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
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
            <DropdownMenuItem
              className="flex items-center gap-3 hover:text-orange70"
              onClick={() => navigator.clipboard.writeText(bank._id)}
            >
              <Edit className="size-5" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-3 hover:text-red-500"
              onClick={() => navigator.clipboard.writeText(bank._id)}
            >
              <Delete className="size-5" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// export interface BankType {
//   name: string;
//   branchCode: string;
//   headquarters: string;
//   establishedYear: number;
//   services: string[];
//   contactEmail: string;
//   contactPhone: string;
//   website: string;
//   logo?: string;
// }
