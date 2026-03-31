import { Request, Response } from "express";
import { getTenantModels } from "../../models/tenantModels";

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const tenantId = req.tenantId || (req.headers['x-tenant-id'] as string);
    if (!tenantId) return res.status(401).json({ error: "Tenant context is required" });

    const { Category } = await getTenantModels(tenantId);
    const { name } = req.params;
    const { color, icon } = req.body;

    if (!name) return res.status(400).json({ error: "Category name is required" });

    const updateData: any = {};
    if (color) updateData.color = color;
    if (icon) updateData.icon = icon;

    const updatedCategory = await Category.findOneAndUpdate(
      { name },
      updateData,
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json(updatedCategory);
  } catch (err) {
    console.error('Update category error:', err);
    res.status(500).json({ error: "Failed to update category", details: err });
  }
};
