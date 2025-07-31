import { Request, Response } from "express";
import { Product } from "../../models/productModel";
import Sale from "../../models/saleModel";

export const deleteSales = async (req: Request, res: Response) => {
  try {
      const sale = await Sale.findById(req.params.id);
      if (!sale) return res.status(404).json({ error: "Sale not found" });
  
      const product = await Product.findById(sale.productId);
  
      if (product) {
        product.stock += sale.quantity;
        await product.save();
      }
  
      await sale.deleteOne();
  
      res.status(200).json({ message: "Sale deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: "Failed to delete sale", details: err });
    }
  }