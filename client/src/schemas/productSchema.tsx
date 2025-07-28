import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  stock: z.coerce.number().min(0, "Stock must be a positive number"),
  category: z.string().min(1, "Category is required"),
});

export type ProductFormValues = {
  name: string;
  price: number;
  stock: number;
  category: string;
};

export type Product = ProductFormValues & { _id: string };