import { useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel,
  getFilteredRowModel, flexRender, } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "../ui/table";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle,
DialogFooter, } from "../ui/dialog";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { columns } from "./column";
import { useState, useEffect } from "react";
import { Edit, Trash2 } from "lucide-react";
import type { Product } from "../../schemas/productSchema";
import EditProductDialog from "./editProduct";
import axios from "axios";

type Props = {
  products: Product[];
  onEdit?: (product: Product) => void;
};

const ProductTable = ({ products: initialProducts }: Props) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({
    pageSize: 10,
    pageIndex: 0,
  });
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  const table = useReactTable({
    data: products,
    columns,
    state: { globalFilter, pagination },
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };

  const handleUpdate = (updated: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p._id === updated._id ? updated : p))
    );
    setEditingProduct(null);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;
    try {
      await axios.delete(`/api/products/${productToDelete._id}`);
      setProducts((prev) => prev.filter((p) => p._id !== productToDelete._id));
    } catch (error) {
      console.error("Failed to delete product:", error);
    } finally {
      setProductToDelete(null);
    }
  };


  return (
    <div className="space-y-4">
      <Input
        placeholder="Search products..."
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="max-w-sm"
      />

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="cursor-pointer">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
              <TableHead>Edit</TableHead>
              <TableHead>Delete</TableHead>
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
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
                    onClick={() => handleEdit(row.original)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setProductToDelete(row.original)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          Are you sure you want to delete&nbsp;
                          <span className="font-semibold">{ row.original.name}</span>?
                        </DialogTitle>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setProductToDelete(null)}>
                          Cancel
                        </Button>
                        <Button variant="destructive" onClick={confirmDelete}>
                          Delete
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length + 2} className="text-center">
                No products found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex items-center justify-end gap-2">
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

      {editingProduct && (
        <EditProductDialog
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSuccess={handleUpdate}
        />
      )}
    </div>
  );
};

export default ProductTable;