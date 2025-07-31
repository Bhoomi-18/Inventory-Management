import { Product } from "../../models/productModel";
import { Request, Response } from "express";
import { updateCategoryCount } from "../../models/updateCatCount";

export const editProduct = async (req: Request, res: Response) => {
  try {
    const original = await Product.findById(req.params.id);
    if (!original) return res.status(404).json({ error: "Product not found" });

    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true, 
    });

    if (!updated) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (original.category !== updated.category) {
      await Promise.all([
        updateCategoryCount(original.category),
        updateCategoryCount(updated.category),
      ]);
    } else {
      await updateCategoryCount(updated.category);
    }

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Failed to update product", details: err });
  }
}