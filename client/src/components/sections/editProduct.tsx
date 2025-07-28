import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductFormBody from "../../pages/product/productForm";
import { type Product, type ProductFormValues } from "../../schemas/productSchema";

type Props = {
  product: Product;
  onSuccess: (updated: Product) => void;
  onClose: () => void;
};


const EditProductDialog = ({ product, onSuccess, onClose }: Props) => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    axios.get("/api/categories").then((res) =>
      setCategories(res.data.map((cat: { name: string }) => cat.name))
    );
  }, []);

  const handleUpdate = async (data: ProductFormValues) => {
    const res = await axios.put(`/api/products/${product._id}`, data);
    onSuccess(res.data);
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <ProductFormBody
          initialValues={product}
          categories={categories}
          onSubmit={handleUpdate}
          onClose={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditProductDialog;