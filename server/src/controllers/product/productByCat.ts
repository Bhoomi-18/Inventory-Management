import { Request, Response } from "express";
import { getTenantModels } from "../../models/tenantModels";

export const productByCat = async (req: Request, res: Response) => {
  try {
    const tenantId = req.tenantId || (req.headers['x-tenant-id'] as string);
    if (!tenantId) return res.status(401).json({ error: "Tenant context is required" });

    const { Product } = await getTenantModels(tenantId);
    const products = await Product.find({
      category: new RegExp(`^${req.params.name}$`, "i"),
    });
    res.json(products);
  } catch {
    res.status(500).json({ error: "Failed to fetch category products" });
  }
};