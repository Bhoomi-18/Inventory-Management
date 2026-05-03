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
  /^https:\/\/inventory-management.*/,   // any custom domain
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

// ── Health checks — ALWAYS available, even before DB connects ──
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});
app.get("/api/health", (_req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// ── API Routes — register immediately so they always exist ──
// (Individual controllers will fail gracefully if DB is not yet connected)
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/auth", userRoutes);

// ── Start HTTP server immediately (don't wait for DB) ──
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// ── Connect to MongoDB with auto-retry ──
const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;

if (!mongoUri) {
  console.error("⚠ MONGO_URI or MONGODB_URI env var is missing — DB features will not work.");
} else {
  const connectWithRetry = async (attempt = 1): Promise<void> => {
    try {
      await dbManager.getGlobalConnection();
      console.log("✅ MongoDB connection established");
    } catch (err) {
      const delay = Math.min(attempt * 3000, 15000); // max 15s between retries
      console.error(`❌ MongoDB connection failed (attempt ${attempt}). Retrying in ${delay / 1000}s…`, err);
      setTimeout(() => connectWithRetry(attempt + 1), delay);
    }
  };
  connectWithRetry();
}