import { Category } from "../../models/categoryModel";
import { Request, Response } from "express";
import { Product } from "../../models/productModel";

export const addCategory = async (req: Request, res: Response) => {
  try {
      const { name } = req.body;
  
      if (!name) return res.status(400).json({ error: "Category name is required" });
  
      const existing = await Category.findOne({ name });
      if (existing) return res.status(409).json({ error: "Category already exists" });
  
      const count = await Product.countDocuments({ category: name });
      const category = await Category.create({ name, count });
      res.status(201).json(category);
    } catch (err) {
      res.status(500).json({ error: "Failed to create category", details: err });
    }
  }