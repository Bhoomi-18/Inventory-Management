import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductFormBody from "../../pages/product/productForm";
import type { Product, ProductFormValues } from "../../schemas/productSchema";

type Props = {
  onSuccess: (newProduct: Product) => void;
  open: boolean;
  onOpenChange: (state: boolean) => void;
};

const AddProductDialog = ({ onSuccess, open, onOpenChange }: Props) => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    axios.get("https://inventory-management-ogu0.onrender.com/api/categories").then((res) =>
      setCategories(res.data.map((cat: { name: string }) => cat.name))
    );
  }, []);

  const handleCreate = async (data: ProductFormValues) => {
    const res = await axios.post("https://inventory-management-ogu0.onrender.com/api/products", data);
    onSuccess(res.data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>
        <ProductFormBody categories={categories} onSubmit={handleCreate} />
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;