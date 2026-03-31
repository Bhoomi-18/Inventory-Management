import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useEffect, useState } from "react";
import api from "../../lib/apiClient";
import ProductFormBody from "../../pages/product/productForm";
import { type Product, type ProductFormValues } from "../../schemas/productSchema";

type Category = {
  name: string;
  color?: string;
  icon?: string;
};

type Props = {
  product: Product;
  onSuccess: (updated: Product) => void;
  onClose: () => void;
};

const EditProductDialog = ({ product, onSuccess, onClose }: Props) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get('/categories')
      .then((res) => setCategories(res.data))
      .catch((err) => console.error('Failed to fetch categories', err))
      .finally(() => setLoading(false));
  }, []);

  const handleUpdate = async (data: ProductFormValues) => {
    try {
      const res = await api.put(`/products/${product._id}`, data);
      onSuccess(res.data);
      onClose();
    } catch (err) {
      console.error("Product update failed", err);
      throw err;
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        {loading ? (
          <div className="py-8 text-center text-muted-foreground">
            Loading categories...
          </div>
        ) : (
          <ProductFormBody
            initialValues={product}
            categories={categories}
            onSubmit={handleUpdate}
            onClose={onClose}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditProductDialog;