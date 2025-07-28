import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Button } from "../../components/ui/button"; 
import { salesColumns } from "./salesColumn";
import { Edit, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import EditSaleDialog from "./editSale";
import type { Sale } from "./addSale";

type Props = {
  sales: Sale[];
};

const SalesTable = ({ sales }: Props) => {
  const [editingSale, setEditingSale] = useState<Sale | null>(null);
  const [data, setData] = useState(sales);

  useEffect(() => {
  setData(sales);
}, [sales]);

  const table = useReactTable({
    data: data,
    columns: salesColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleEditSuccess = (updated: Sale) => {
    setData((prev) =>
      prev.map((sale) => (sale._id === updated._id ? updated : sale))
    );
    setEditingSale(null);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`https://inventory-management-ogu0.onrender.com/api/sales/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || "Failed to delete sale");
      }
      setData((prev) => prev.filter((sale) => sale._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
              <TableHead>Edit</TableHead>
              <TableHead>Delete</TableHead>
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setEditingSale(row.original)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(row.original._id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>

      {editingSale && (
        <EditSaleDialog
          sale={editingSale}
          onSuccess={handleEditSuccess}
          onClose={() => setEditingSale(null)}
        />
      )}

    </div>
  );
};

export default SalesTable;