import { Schema, Connection } from 'mongoose';
import dbManager from '../lib/dbManager';

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

const categorySchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    count: { type: Number, default: 0 },
    color: { type: String, default: '#3B82F6' },
    icon: { type: String, default: 'Tags' },
  },
  { timestamps: true }
);

const saleSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    customerName: { type: String },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

async function getTenantConnection(tenantId: string): Promise<Connection> {
  return dbManager.getUserConnection(tenantId);
}

export async function getTenantModels(tenantId: string) {
  const conn = await getTenantConnection(tenantId);

  const Product = conn.models.Product || conn.model('Product', productSchema);
  const Category = conn.models.Category || conn.model('Category', categorySchema);
  const Sale = conn.models.Sale || conn.model('Sale', saleSchema);

  return { Product, Category, Sale };
}
