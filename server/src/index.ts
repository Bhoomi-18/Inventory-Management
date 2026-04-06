import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import saleRoutes from "./routes/saleRoutes";
import userRoutes from "./routes/userRoutes";
import dbManager from "./lib/dbManager";

const app = express();

app.use(cors());
app.use(express.json());

const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
if (!mongoUri) {
  console.error("MONGO_URI or MONGODB_URI is missing from environment variables.");
  process.exit(1);
}

const startServer = async () => {
  try {
    await dbManager.getGlobalConnection();
    console.log("Global MongoDB connection established");

    app.use("/api/products", productRoutes);
    app.use("/api/categories", categoryRoutes);
    app.use("/api/sales", saleRoutes);
    app.use("/api/auth", userRoutes);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

void startServer();