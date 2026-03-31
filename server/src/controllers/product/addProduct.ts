import { Request, Response } from "express";
import { getTenantModels } from "../../models/tenantModels";
import { updateCategoryCount } from "../../models/updateCatCount";

export const addProduct = async (req: Request, res: Response) => {
  try {
    const tenantId = req.tenantId || (req.headers['x-tenant-id'] as string);
    if (!tenantId) return res.status(401).json({ error: "Tenant context is required" });

    const { Product } = await getTenantModels(tenantId);
    
    // Check for duplicate product name
    const existingProduct = await Product.findOne({ name: req.body.name });
    if (existingProduct) {
      return res.status(400).json({ error: "Product with this name already exists" });
    }

    const newProduct = new Product(req.body);
    await newProduct.validate();
    await newProduct.save();

    await updateCategoryCount(tenantId, newProduct.category);

    res.status(201).json(newProduct);
  } catch (err: any) {
    res.status(400).json({ error: "Failed to create product", details: err });
  }
};