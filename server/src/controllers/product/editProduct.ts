import { Request, Response } from "express";
import { getTenantModels } from "../../models/tenantModels";
import { updateCategoryCount } from "../../models/updateCatCount";

export const editProduct = async (req: Request, res: Response) => {
  try {
    const tenantId = req.tenantId || (req.headers['x-tenant-id'] as string);
    if (!tenantId) return res.status(401).json({ error: "Tenant context is required" });

    const { Product } = await getTenantModels(tenantId);

    const original = await Product.findById(req.params.id);
    if (!original) return res.status(404).json({ error: "Product not found" });

    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) return res.status(404).json({ error: "Product not found" });

    if (original.category !== updated.category) {
      await Promise.all([
        updateCategoryCount(tenantId, original.category),
        updateCategoryCount(tenantId, updated.category),
      ]);
    } else {
      await updateCategoryCount(tenantId, updated.category);
    }

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Failed to update product", details: err });
  }
};