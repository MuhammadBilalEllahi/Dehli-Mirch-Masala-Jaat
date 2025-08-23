// models/Item.js
import mongoose from 'mongoose';
import { z } from "zod";
import { MODELS } from '@/models/constants';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true },
  description: String,
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 }, // percentage
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: MODELS.CATEGORY }],
  images: [String],
  brand: String,

  variants: [{ type: mongoose.Schema.Types.ObjectId, ref: MODELS.VARIANT }],

  // reviews: { type: mongoose.Schema.Types.ObjectId, ref: MODELS.REVIEW },


  ratingAvg: { type: Number, default: 0 }, // aggregate
  reviewCount: { type: Number, default: 0 },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});




// Schema validation with Zod
export const productZodSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  slug: z.string().optional(),
  description: z.string().optional(),
  price: z.number().positive("Price must be greater than 0"),
  discount: z.number().min(0).max(100).optional(),
  categories: z.array(z.string()).optional(), // ObjectIds as strings
  images: z.array(z.string().url()).optional(),
  brand: z.string().optional(),
  variants: z.array(z.string()).optional() // list of Variant IDs
});

export default mongoose.models[MODELS.PRODUCT] || mongoose.model(MODELS.PRODUCT, ProductSchema);