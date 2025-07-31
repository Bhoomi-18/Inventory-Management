import { Product } from "../../models/productModel";
import { Request, Response } from "express";

export const getProduct = async (req: Request, res: Response) => {
  try {
      const products = await Product.find().sort({ createdAt: -1 });
      res.json(products);
    } catch {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  }