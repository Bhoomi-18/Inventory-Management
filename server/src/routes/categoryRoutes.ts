import express from "express";
import { Category } from "../models/categoryModel";
import { Product } from "../models/productModel";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) return res.status(400).json({ error: "Category name is required" });

    const existing = await Category.findOne({ name });
    if (existing) return res.status(409).json({ error: "Category already exists" });

    const count = await Product.countDocuments({ category: name });
    const category = await Category.create({ name, count });
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: "Failed to create category", details: err });
  }
});

export default router;