import { Router } from "express";
import { Product } from "../models/productModel";
import { Category } from "../models/categoryModel";
import { updateCategoryCount } from "../models/updateCatCount";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.validate();
    await newProduct.save();

    await updateCategoryCount(newProduct.category);

    res.status(201).json(newProduct);
  } catch (err: any) {
    res.status(400).json({ error: "Failed to create product", details: err });
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

router.get("/low-stock", async (req, res) => {
  try {
    const threshold = Number(req.query.limit) || 10;
    const products = await Product.find({ stock: { $lt: threshold } }).sort({ stock: 1 });
    res.json(products);
  } catch {
    res.status(500).json({ error: "Failed to fetch low stock items" });
  }
});

router.get("/category/:name", async (req, res) => {
  try {
    const products = await Product.find({
      category: new RegExp(`^${req.params.name}$`, "i"),
    });
    res.json(products);
  } catch {
    res.status(500).json({ error: "Failed to fetch category products" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const original = await Product.findById(req.params.id);
    if (!original) return res.status(404).json({ error: "Product not found" });

    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true, 
    });

    if (!updated) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (original.category !== updated.category) {
      await Promise.all([
        updateCategoryCount(original.category),
        updateCategoryCount(updated.category),
      ]);
    } else {
      await updateCategoryCount(updated.category);
    }

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Failed to update product", details: err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    await updateCategoryCount(product.category);

    res.json({ message: "Product deleted" });
  } catch {
    res.status(500).json({ error: "Failed to delete product" });
  }
});

export default router;