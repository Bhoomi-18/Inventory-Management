import { Request, Response } from "express";
import { getTenantModels } from "../../models/tenantModels";

export const editSales = async (req: Request, res: Response) => {
  try {
    const tenantId = req.tenantId || (req.headers['x-tenant-id'] as string);
    if (!tenantId) return res.status(401).json({ error: "Tenant context is required" });

    const { Sale } = await getTenantModels(tenantId);
    const { quantity, customerName } = req.body;

    const sale = await Sale.findById(req.params.id).populate("productId");
    if (!sale) return res.status(404).json({ error: "Sale not found" });

    const product = sale.productId as any;
    product.stock += sale.quantity;

    if (product.stock < quantity) {
      return res.status(400).json({ error: "Insufficient stock for update" });
    }

    sale.quantity = quantity;
    sale.customerName = customerName;
    sale.totalPrice = product.price * quantity;
    product.stock -= quantity;

    await Promise.all([sale.save(), product.save()]);

    res.status(200).json(sale);
  } catch (err) {
    res.status(500).json({ error: "Failed to update sale", details: err });
  }
};