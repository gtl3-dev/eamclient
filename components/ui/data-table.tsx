"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./button";
import {
  tw_table_detail,
  tw_alt_rows,
  tw_blue_button,
  tw_purple_button,
} from "@/lib/tw-constants";
import { useState } from "react";
import { getQBdata } from "@/lib/qbapis";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  showbuttons: boolean;
}

export default function DataTable<TData, TValue>({
  columns,
  data,
  showbuttons,
}: DataTableProps<TData, TValue>) {
  const tw_td_bold = `${tw_table_detail} font-semibold`;
  const tw_td_buttons = `${tw_table_detail} flex flex-row-reverse`;
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  // ////////////////////////////
  // EDIT RECORD
  const [refreshKey, setRefreshKey] = useState(0);
  const [openEdit, setOpenEdit] = useState(false);
  const [editNumber, setEditNumber] = useState<number>(0);
  const [keyValueEdit, setKeyValueEdit] = useState<number>(0); // used for re-rending dialog box

  // ////////////////////////////
  // DELETE RECORD
  const [isopen, setOpen] = useState(false);
  const [keyValue, setKeyValue] = useState<number>(0); // used for re-rending dialog box
  const [confirmDelnum, setConfirmDelNumber] = useState(0);
  const stub = "";
  // Callback function after successful del
  function calldelData() {
    // console.log("ID to delete: ", confirmDelnum);
    delData(confirmDelnum);
  }
  async function delData(id: number) {
    const delstub = `${stub}${id}`;
    const res = await getQBdata(delstub, "DELETE");
    // You can then redirect, or refresh a state, etc...
    setRefreshKey((oldKey: number) => oldKey + 1);
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className={tw_alt_rows}
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className={tw_table_detail}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                  {showbuttons && (
                    <TableCell className={tw_td_buttons}>
                      <button
                        onClick={(e) => {
                          e.preventDefault;
                          setOpenEdit(true);
                          setKeyValueEdit((val) => val + 1); // Used for re-rendering dialog
                          setEditNumber(parseInt(row.id));
                          console.log("EDIT rec:", row.id);
                          console.log(
                            "openEdit status in ItemList: ",
                            openEdit
                          );
                        }}
                        className={tw_blue_button}
                      >
                        Edit
                      </button>
                      {"   "}
                      <button
                        onClick={(e) => {
                          e.preventDefault;
                          setOpen(true);
                          setKeyValue((val) => val + 1); // Used for re-rendering dialog
                          setConfirmDelNumber(parseInt(row.id));
                          console.log("open status in ItemList: ", open);
                        }}
                        className={tw_purple_button}
                      >
                        Delete
                      </button>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </>
  );
}
