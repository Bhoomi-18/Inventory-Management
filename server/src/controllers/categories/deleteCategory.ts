import { Request, Response } from "express";
import { getTenantModels } from "../../models/tenantModels";

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const tenantId = req.tenantId || (req.headers['x-tenant-id'] as string);
    if (!tenantId) return res.status(401).json({ error: "Tenant context is required" });

    const { Category, Product } = await getTenantModels(tenantId);
    const { name } = req.params;

    if (!name) return res.status(400).json({ error: "Category name is required" });

    const productsWithCategory = await Product.countDocuments({ category: name });
    if (productsWithCategory > 0) {
      return res.status(400).json({ error: "Cannot delete category with existing products" });
    }

    const result = await Category.deleteOne({ name });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (err) {
    console.error('Delete category error:', err);
    res.status(500).json({ error: "Failed to delete category", details: err });
  }
};
