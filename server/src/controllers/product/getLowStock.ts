import { Product } from "../../models/productModel";
import { Request, Response } from "express";

export const getLowStock = async (req: Request, res: Response) => {
  try {
    const threshold = Number(req.query.limit) || 10;
    const products = await Product.find({ stock: { $lt: threshold } }).sort({ stock: 1 });
    res.json(products);
  } catch {
    res.status(500).json({ error: "Failed to fetch low stock items" });
  }
}