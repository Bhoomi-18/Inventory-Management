import express from "express";
import { Product } from "../models/productModel";
import Sale from "../models/saleModel";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
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
});

router.get("/", async (req, res) => {
  try {
    const sales = await Sale.find()
      .populate("productId", "name price") 
      .sort({ timestamp: -1 }); 

    res.status(200).json(sales);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch sales", details: err });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { quantity, customerName } = req.body;

    const sale = await Sale.findById(req.params.id).populate("productId");
    if (!sale) return res.status(404).json({ error: "Sale not found" });

    const product = sale.productId as unknown as {
      stock: number;
      price: number;
      save: () => Promise<any>;
    };

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
});

router.delete("/:id", async (req, res) => {
  try {
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
});


export default router;