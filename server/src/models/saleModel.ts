import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  customerName: String,
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("Sale", saleSchema);