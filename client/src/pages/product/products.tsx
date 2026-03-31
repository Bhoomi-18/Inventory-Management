import { useEffect, useState } from "react";
import api from "../../lib/apiClient";
import ProductTable from "../../components/sections/productTable";
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";
import { PlusCircle } from "lucide-react";
import type { Product } from "../../schemas/productSchema";
import AddProductDialog from "../../components/sections/addProduct";
import EditProductDialog from "../../components/sections/editProduct";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProducts = () => {
    setLoading(true);
    api
      .get('/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error('Failed to fetch products', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddSuccess = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
    setShowAddDialog(false);
  };

  const handleEditSuccess = (updated: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p._id === updated._id ? updated : p))
    );
    setEditProduct(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Products</h1>
        <Button
          className="flex items-center gap-2"
          onClick={() => setShowAddDialog(true)}
        >
          <PlusCircle className="w-4 h-4" />
          Add Product
        </Button>
        <AddProductDialog
          open={showAddDialog}
          onOpenChange={setShowAddDialog}
          onSuccess={handleAddSuccess}
        />
      </div>

      <Separator />

      {loading ? (
        <div className="py-12 text-center text-muted-foreground">
          Loading products...
        </div>
      ) : (
        <ProductTable
          products={products}
          onEdit={(product: Product) => setEditProduct(product)}
        />
      )}

      {editProduct && (
        <EditProductDialog
          product={editProduct}
          onSuccess={handleEditSuccess}
          onClose={() => setEditProduct(null)}
        />
      )}
    </div>
  );
};

export default Products;