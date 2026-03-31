import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Button } from "../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { salesColumns } from "./salesColumn";
import { Edit, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import EditSaleDialog from "./editSale";
import { DeleteSaleDialog } from "./deleteSale";
import type { Sale } from "./addSale";

type Props = {
  sales: Sale[];
};

const SalesTable = ({ sales }: Props) => {
  const [editingSale, setEditingSale] = useState<Sale | null>(null);
  const [saleToDelete, setSaleToDelete] = useState<Sale | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [data, setData] = useState(sales);
  const [pagination, setPagination] = useState({
    pageSize: 10,
    pageIndex: 0,
  });

  useEffect(() => {
    setData(sales);
  }, [sales]);

  const table = useReactTable({
    data: data,
    columns: salesColumns,
    state: { pagination },
    onPaginationChange: setPagination,
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

  const handleDeleteSuccess = () => {
    setData((prev) => prev.filter((sale) => sale._id !== saleToDelete?._id));
    setDeleteOpen(false);
    setSaleToDelete(null);
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
                  onClick={() => {
                    setSaleToDelete(row.original);
                    setDeleteOpen(true);
                  }}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="text-sm text-muted-foreground">
          Page {pagination.pageIndex + 1} of {table.getPageCount()}
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-muted-foreground">Rows per page:</label>
          <Select value={String(pagination.pageSize)} onValueChange={(value) => {
            table.setPageSize(parseInt(value));
          }}>
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>

      {editingSale && (
        <EditSaleDialog
          sale={editingSale}
          onSuccess={handleEditSuccess}
          onClose={() => setEditingSale(null)}
        />
      )}

      {saleToDelete && (
        <DeleteSaleDialog
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
          sale={saleToDelete}
          onSuccess={handleDeleteSuccess}
        />
      )}
    </div>
  );
};

export default SalesTable;