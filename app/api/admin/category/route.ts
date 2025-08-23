import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Category, { categorySchema } from "@/models/Category";
import { z } from "zod";
import dbConnect from "@/lib/mongodb"; // your DB helper


// GET all categories
export async function GET() {
  await dbConnect();
  try {
    const categories = await Category.find().populate("parent").lean();
    return NextResponse.json({ success: true, categories });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// POST create category
export async function POST(req: Request) {
  await dbConnect();
  try {
    const body = await req.json();
    const validated = categorySchema.parse(body);

    // auto-generate slug if not provided
    if (!validated.slug) {
      validated.slug = validated.name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, "");
    }

    const newCategory = await Category.create(validated);
    return NextResponse.json({ success: true, category: newCategory });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: err.message }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
