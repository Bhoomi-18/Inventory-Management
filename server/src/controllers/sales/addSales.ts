import { Request, Response } from "express";
import { Product } from "../../models/productModel";
import Sale from "../../models/saleModel";

export const addSales = async (req: Request, res: Response) => {
  try {
      const { productId, quantity, customerName } = req.body;
      const product = await Product.findById(productId);
      if (!product) return res.status(404).json({ error: "Product not found" });
      if (product.stock < quantity) return res.status(400).json({ error: "Insufficient stock" });
  
      const sale = await Sale.create({
        productId,
        quantity,
        totalPrice: product.price * quantity,
        customerName,
      });
  
      product.stock -= quantity;
      await product.save();
  
      res.status(201).json(sale);
    } catch (err) {
      res.status(500).json({ error: "Failed to create sale", details: err });
    }
  }