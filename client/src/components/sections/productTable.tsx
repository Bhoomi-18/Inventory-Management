import { useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel,
  getFilteredRowModel, flexRender, } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "../ui/table";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { columns } from "./column";
import { useState, useEffect } from "react";
import { Edit, Trash2 } from "lucide-react";
import type { Product } from "../../schemas/productSchema";
import EditProductDialog from "./editProduct";
import { DeleteProductDialog } from "./deleteProduct";
import api from "../../lib/apiClient";

type Category = {
  name: string;
  color?: string;
};

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
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Map<string, Category>>(new Map());

  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  useEffect(() => {
    // Fetch categories for color mapping
    api
      .get('/categories')
      .then((res) => {
        const categoryMap = new Map<string, Category>(
          res.data.map((cat: Category) => [cat.name, cat])
        );
        setCategories(categoryMap);
      })
      .catch((err) => console.error('Failed to fetch categories', err));
  }, []);

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

  const handleDeleteSuccess = () => {
    setProducts((prev) => prev.filter((p) => p._id !== productToDelete?._id));
    setDeleteOpen(false);
    setProductToDelete(null);
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
            table.getRowModel().rows.map((row) => {
              const categoryColor = categories.get(row.original.category)?.color || '#E5E7EB';
              return (
                <TableRow key={row.id}>
                  <TableCell
                    style={{
                      borderLeft: `4px solid ${categoryColor}`,
                      paddingLeft: '12px',
                    }}
                  >
                    {flexRender(
                      table.getAllColumns()[0].columnDef.cell,
                      row.getVisibleCells()[0].getContext()
                    )}
                  </TableCell>
                  {row.getVisibleCells().slice(1).map((cell) => (
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
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setProductToDelete(row.original);
                        setDeleteOpen(true);
                      }}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length + 2} className="text-center py-8 text-muted-foreground">
                No products found.
              </TableCell>
            </TableRow>
          )}
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
      </div>

      {editingProduct && (
        <EditProductDialog
          product={editingProduct}
          onSuccess={handleUpdate}
          onClose={() => setEditingProduct(null)}
        />
      )}

      {productToDelete && (
        <DeleteProductDialog
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
          productName={productToDelete.name}
          productId={productToDelete._id}
          onSuccess={handleDeleteSuccess}
        />
      )}
    </div>
  );
};

export default ProductTable;