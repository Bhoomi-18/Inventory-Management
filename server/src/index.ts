// env.ts MUST be first — loads dotenv before any other imports read process.env
import './env';

import express from 'express';
import cors, { type CorsOptions } from 'cors';
import productRoutes from './routes/productRoutes';
import categoryRoutes from './routes/categoryRoutes';
import saleRoutes from './routes/saleRoutes';
import userRoutes from './routes/userRoutes';
import dbManager from './lib/dbManager';

const app = express();

// ── CORS ──────────────────────────────────────────────────────────
const allowedOrigins: (string | RegExp)[] = [
  /^http:\/\/localhost(:\d+)?$/,        // any localhost port (dev)
  /^https:\/\/.*\.vercel\.app$/,        // all Vercel preview & prod URLs
  /^https:\/\/inventory-management.*/,  // any custom domain
];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    const allowed = allowedOrigins.some((p) =>
      typeof p === 'string' ? p === origin : p.test(origin)
    );
    if (allowed) return callback(null, true);
    callback(new Error(`CORS: origin not allowed – ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
// Express 5 requires explicit wildcard syntax for OPTIONS preflight
app.options('/{*path}', cors(corsOptions));
// ─────────────────────────────────────────────────────────────────

app.use(express.json());

// ── Health — always available (no DB dependency) ──
let dbConnected = false;
let dbError: string | null = null;

app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    db: dbConnected ? 'connected' : (dbError || 'connecting…'),
    timestamp: new Date().toISOString(),
  });
});
app.get('/api/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    db: dbConnected ? 'connected' : (dbError || 'connecting…'),
    timestamp: new Date().toISOString(),
  });
});

// ── API routes — registered immediately ──
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api/auth', userRoutes);

// ── HTTP server starts immediately ──
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// ── Connect MongoDB with auto-retry (non-blocking) ──
const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;

if (!mongoUri) {
  dbError = 'MONGO_URI / MONGODB_URI not set';
  console.error('⚠  ' + dbError + ' — all DB operations will fail');
} else {
  const safeUri = mongoUri.replace(/:\/\/.*@/, '://***@');
  console.log(`MongoDB URI: ${safeUri}`);

  const connectWithRetry = async (attempt = 1): Promise<void> => {
    try {
      await dbManager.getGlobalConnection();
      dbConnected = true;
      dbError = null;
      console.log('✅ MongoDB connected');
    } catch (err: any) {
      dbError = err?.message || 'Unknown error';
      const delay = Math.min(attempt * 3000, 15000);
      console.error(`❌ MongoDB attempt ${attempt} failed (${dbError}) — retrying in ${delay / 1000}s`);
      setTimeout(() => connectWithRetry(attempt + 1), delay);
    }
  };
  connectWithRetry();
}