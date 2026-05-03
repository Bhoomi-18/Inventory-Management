import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors, { type CorsOptions } from "cors";
import productRoutes from "./routes/productRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import saleRoutes from "./routes/saleRoutes";
import userRoutes from "./routes/userRoutes";
import dbManager from "./lib/dbManager";

const app = express();

// ── CORS ────────────────────────────────────────────────────────
const allowedOrigins: (string | RegExp)[] = [
  /^http:\/\/localhost(:\d+)?$/,         // any localhost port (dev)
  /^https:\/\/.*\.vercel\.app$/,         // all Vercel preview & prod URLs
  /^https:\/\/inventory-management.*/,   // any custom inventory-management domain
];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    const allowed = allowedOrigins.some((p) =>
      typeof p === "string" ? p === origin : p.test(origin)
    );
    if (allowed) return callback(null, true);
    callback(new Error(`CORS: origin not allowed – ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
// ────────────────────────────────────────────────────────────────

app.use(express.json());

// ── Health check – keeps Render awake and lets frontend detect status ──
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

app.get("/api/health", (_req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

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