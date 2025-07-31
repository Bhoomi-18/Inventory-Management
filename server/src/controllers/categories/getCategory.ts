import { Category } from "../../models/categoryModel";
import { Request, Response } from "express";

export const getCategory = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
}