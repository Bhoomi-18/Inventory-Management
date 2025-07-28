import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const salesColumns: ColumnDef<any>[] = [
  {
    id: "sno",
    header: "S.No.",
    enableSorting: false,
    cell: ({ row, table }) => {
      const pageIndex = table.getState().pagination.pageIndex;
      const pageSize = table.getState().pagination.pageSize;
      return row.index + 1 + pageIndex * pageSize;
    },
  },
  {
    accessorKey: "productId.name",
    header: "Product",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "totalPrice",
    header: "Total",
    cell: ({ getValue }) => `₹${getValue()}`,
  },
  {
    accessorKey: "customerName",
    header: "Customer",
  },
  {
    accessorKey: "timestamp",
    header: "Date",
    cell: ({ getValue }) => {
      const raw = getValue() as string; 
      return format(new Date(raw), "dd MMM yyyy, HH:mm");
    },
  },
];