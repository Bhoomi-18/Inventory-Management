import { Request, Response } from "express";
import { getTenantModels } from "../../models/tenantModels";

export const getLowStock = async (req: Request, res: Response) => {
  try {
    const tenantId = req.tenantId || (req.headers['x-tenant-id'] as string);
    if (!tenantId) return res.status(401).json({ error: "Tenant context is required" });

    const { Product } = await getTenantModels(tenantId);
    const threshold = Number(req.query.limit) || 10;
    const products = await Product.find({ stock: { $lt: threshold } }).sort({ stock: 1 });
    res.json(products);
  } catch {
    res.status(500).json({ error: "Failed to fetch low stock items" });
  }
};