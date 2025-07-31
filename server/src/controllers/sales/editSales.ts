import { Request, Response } from "express";
import Sale from "../../models/saleModel";

export const editSales = async (req: Request, res: Response) => {
  try {
      const { quantity, customerName } = req.body;
  
      const sale = await Sale.findById(req.params.id).populate("productId");
      if (!sale) return res.status(404).json({ error: "Sale not found" });
  
      const product = sale.productId as unknown as {
        stock: number;
        price: number;
        save: () => Promise<any>;
      };
  
      product.stock += sale.quantity;
  
      if (product.stock < quantity) {
        return res.status(400).json({ error: "Insufficient stock for update" });
      }
  
      sale.quantity = quantity;
      sale.customerName = customerName;
      sale.totalPrice = product.price * quantity;
  
      product.stock -= quantity;
  
      await Promise.all([sale.save(), product.save()]);
  
      res.status(200).json(sale);
    } catch (err) {
      res.status(500).json({ error: "Failed to update sale", details: err });
    }
  }