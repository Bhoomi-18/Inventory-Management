import { Request, Response } from "express";
import Sale from "../../models/saleModel";

export const getSales = async (req: Request, res: Response) => {
  try {
      const sales = await Sale.find()
        .populate("productId", "name price") 
        .sort({ timestamp: -1 }); 
  
      res.status(200).json(sales);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch sales", details: err });
    }
  }