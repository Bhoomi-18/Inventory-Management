import { Product } from "../../models/productModel";
import { Request, Response } from "express";
import { updateCategoryCount } from "../../models/updateCatCount";

export const deleteProduct = async (req: Request, res: Response) => {
  try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) return res.status(404).json({ error: "Product not found" });
  
      await updateCategoryCount(product.category);
  
      res.json({ message: "Product deleted" });
    } catch {
      res.status(500).json({ error: "Failed to delete product" });
    }
  }