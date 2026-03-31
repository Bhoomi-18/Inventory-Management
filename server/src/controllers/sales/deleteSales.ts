import { Request, Response } from "express";
import { getTenantModels } from "../../models/tenantModels";

export const deleteSales = async (req: Request, res: Response) => {
  try {
    const tenantId = req.tenantId || (req.headers['x-tenant-id'] as string);
    if (!tenantId) return res.status(401).json({ error: "Tenant context is required" });

    const { Product, Sale } = await getTenantModels(tenantId);

    const sale = await Sale.findById(req.params.id);
    if (!sale) return res.status(404).json({ error: "Sale not found" });

    const product = await Product.findById(sale.productId);

    if (product) {
      product.stock += sale.quantity;
      await product.save();
    }

    await sale.deleteOne();

    res.status(200).json({ message: "Sale deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete sale", details: err });
  }
};