import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useEffect, useState } from "react";
import api from "../../lib/apiClient";
import ProductFormBody from "../../pages/product/productForm";
import type { Product, ProductFormValues } from "../../schemas/productSchema";

type Category = {
  name: string;
  color?: string;
  icon?: string;
};

type Props = {
  onSuccess: (newProduct: Product) => void;
  open: boolean;
  onOpenChange: (state: boolean) => void;
};

const AddProductDialog = ({ onSuccess, open, onOpenChange }: Props) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (open) {
      setLoading(true);
      api
        .get('/categories')
        .then((res) => setCategories(res.data))
        .catch((err) => console.error('Failed to fetch categories', err))
        .finally(() => setLoading(false));
    }
  }, [open]);

  const handleCreate = async (data: ProductFormValues) => {
    try {
      const res = await api.post('/products', data);
      onSuccess(res.data);
      onOpenChange(false);
    } catch (err: any) {
      console.error("Product creation failed", err);
      throw err;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>
        {loading ? (
          <div className="py-8 text-center text-muted-foreground">
            Loading categories...
          </div>
        ) : (
          <ProductFormBody
            categories={categories}
            onSubmit={handleCreate}
            onClose={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;