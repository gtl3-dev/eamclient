"use client";

import { ColumnDef } from "@tanstack/react-table";
import { AssetCatType } from "@/@types/interfaces";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<AssetCatType>[] = [
  {
    accessorKey: "Id",
    header: "Id",
  },
  {
    accessorKey: "Type",
    header: "Type",
  },
  {
    accessorKey: "Name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "FullyQualifiedName",
    header: "Fully Qualified Name",
  },
];
