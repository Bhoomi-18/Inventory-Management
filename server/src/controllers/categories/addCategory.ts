import { Request, Response } from "express";
import { getTenantModels } from "../../models/tenantModels";

export const addCategory = async (req: Request, res: Response) => {
  try {
    const tenantId = req.tenantId || (req.headers['x-tenant-id'] as string);
    if (!tenantId) return res.status(401).json({ error: "Tenant context is required" });

    const { Category, Product } = await getTenantModels(tenantId);

    const { name, color = '#3B82F6', icon = 'Tags' } = req.body;
    if (!name) return res.status(400).json({ error: "Category name is required" });

    const existing = await Category.findOne({ name });
    if (existing) return res.status(409).json({ error: "Category already exists" });

    const count = await Product.countDocuments({ category: name });
    const category = await Category.create({ name, count, color, icon });
    res.status(201).json(category);
  } catch (err) {
    console.error('Add category error:', err);
    res.status(500).json({ error: "Failed to create category", details: err });
  }
};