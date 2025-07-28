import type { ColumnDef } from "@tanstack/react-table";
import type { Product } from "../../schemas/productSchema";
import SortableHeader from "./columnSort";
import { Badge } from "../ui/badge";

export const columns: ColumnDef<Product>[] = [
  {
    id: "sno",
    enableSorting: false,
    header: ({ header }) => <SortableHeader header={header} label="S.No." />,
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "name",
    header: ({ header }) => <SortableHeader header={header} label="Name" />,
  },
  {
    accessorKey: "category",
    header: ({ header }) => <SortableHeader header={header} label="Category" />,
  },
  {
    accessorKey: "price",
    header: ({ header }) => <SortableHeader header={header} label="Price" />,
    cell: ({ row }) => `₹${row.getValue("price")}`,
  },
  {
    accessorKey: "stock",
    header: ({ header }) => <SortableHeader header={header} label="Stock" />,
    cell: ({ row }) =>
      row.getValue("stock") === 0 ? (
        <span className="text-red-500 font-semibold">Out of stock</span>
      ) : (
        row.getValue("stock")
      ),
  },
  {
    id: "availability",
    header: "Availability",
    cell: ({ row }) => {
      const stock = row.original.stock;
      return stock === 0 ? (
        <span className="text-red-500 font-semibold">Out of stock</span>
      ) : stock < 10 ? (
        <Badge variant="destructive">Low Stock</Badge>
      ) : (
        <Badge variant="outline">In Stock</Badge>
      );
    },
  },

];