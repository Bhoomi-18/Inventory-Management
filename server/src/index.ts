import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import productRoutes from "./routes/productRoutes";
import dotenv from "dotenv";
import categoryRoutes from "./routes/categoryRoutes";
import saleRoutes from "./routes/saleRoutes";
import userRoutes from "./routes/userRoutes";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error("MONGO_URI is missing from environment variables.");
  process.exit(1);
}

mongoose
  .connect(mongoUri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/sales", saleRoutes)
app.use("/api/auth", userRoutes)

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});