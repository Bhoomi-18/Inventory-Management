import { Request, Response } from "express";
import { getTenantModels } from "../../models/tenantModels";

export const getSales = async (req: Request, res: Response) => {
  try {
    const tenantId = req.tenantId || (req.headers['x-tenant-id'] as string);
    if (!tenantId) return res.status(401).json({ error: "Tenant context is required" });

    const { Sale } = await getTenantModels(tenantId);
    const sales = await Sale.find()
      .populate("productId", "name price")
      .sort({ timestamp: -1 });

    res.status(200).json(sales);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch sales", details: err });
  }
};