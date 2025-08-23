// models/Cart.ts
import mongoose from "mongoose";
import { MODELS } from "@/models/constants";

const CartItemSchema = new mongoose.Schema({
  variant: { type: mongoose.Schema.Types.ObjectId, ref: MODELS.VARIANT, required: true },
  quantity: { type: Number, required: true, min: 1 },
  // Snapshot for UX: price shown in cart UI (not final)
  priceSnapshot: { type: Number, required: true }, // according to qty
  label: String // e.g. "1kg"
}, { _id: false });

const CartSchema = new mongoose.Schema({

  user: { type: mongoose.Schema.Types.ObjectId, ref: MODELS.USER, default: null },
  uuidv4: { type: String, default: null }, // for guests
  items: [CartItemSchema],
  currency: { type: String, default: "PKR" },
  updatedAt: { type: Date, default: Date.now }
});

// Unique either on user or on session
CartSchema.index({ user: 1 }, { unique: true, partialFilterExpression: { user: { $type: "objectId" } } });
CartSchema.index({ uuidv4: 1 }, { unique: true, partialFilterExpression: { uuidv4: { $type: "string" } } });

export default mongoose.models[MODELS.CART] || mongoose.model(MODELS.CART, CartSchema);
