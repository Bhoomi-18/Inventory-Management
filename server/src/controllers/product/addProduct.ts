import { Product } from "../../models/productModel";
import { Request, Response } from "express";
import { updateCategoryCount } from "../../models/updateCatCount";


export const addProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.validate();
    await newProduct.save();

    await updateCategoryCount(newProduct.category);

    res.status(201).json(newProduct);
  } catch (err: any) {
    res.status(400).json({ error: "Failed to create product", details: err });
  }
}