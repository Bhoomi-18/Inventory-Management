import { Product } from "../../models/productModel";
import { Request, Response } from "express";

export const productByCat = async (req: Request, res: Response) => {
  try {
    const products = await Product.find({
      category: new RegExp(`^${req.params.name}$`, "i"),
    });
    res.json(products);
  } catch {
    res.status(500).json({ error: "Failed to fetch category products" });
  }
}