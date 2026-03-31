import { Request, Response } from "express";
import { getTenantModels } from "../../models/tenantModels";

export const addSales = async (req: Request, res: Response) => {
  try {
    const tenantId = req.tenantId || (req.headers['x-tenant-id'] as string);
    if (!tenantId) return res.status(401).json({ error: "Tenant context is required" });

    const { Product, Sale } = await getTenantModels(tenantId);

    const { productId, quantity, customerName } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });
    if (product.stock < quantity) return res.status(400).json({ error: "Insufficient stock" });

    const sale = await Sale.create({
      productId,
      quantity,
      totalPrice: product.price * quantity,
      customerName,
    });

    product.stock -= quantity;
    await product.save();

    res.status(201).json(sale);
  } catch (err) {
    res.status(500).json({ error: "Failed to create sale", details: err });
  }
};