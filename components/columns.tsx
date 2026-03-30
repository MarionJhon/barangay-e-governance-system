"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  FileUser,
  MoreHorizontal,
  UserRoundPen,
  UserRoundPlus,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import DeleteDialog from "./DeleteDialog";
import CreateAccountDialog from "./resident/create-account-dialog";

export type ResidentTableType = {
  id: string;
  fullName: string;
  sex: string;
  purok: string;
  status: string;
};

export const columns: ColumnDef<ResidentTableType>[] = [
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
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "fullName",
    header: "FullName",
  },
  {
    accessorKey: "sex",
    header: "Sex",
  },
  {
    accessorKey: "purok",
    header: "Purok",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const resident = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(resident.id)}
              className="flex group focus:bg-sky-500/10 focus:text-sky-500 transition-colors duration-200"
            >
              <FileUser className="text-gray-700 group-focus:text-sky-500" />
              View Info
            </DropdownMenuItem>
            <CreateAccountDialog resident={resident.fullName} />
            <DropdownMenuItem className="flex group focus:bg-amber-500/10 focus:text-amber-500 transition-colors duration-200">
              <UserRoundPen className="text-gray-700 group-focus:text-amber-500" />
              Update
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DeleteDialog id={resident.id} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
