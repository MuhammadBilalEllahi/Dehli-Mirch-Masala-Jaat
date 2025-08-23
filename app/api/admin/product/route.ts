import dbConnect from "@/lib/mongodb";
import Product, { productZodSchema } from "@/models/Product";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  await dbConnect();

  // ✅ Parse + validate in one step
  const parsed = productZodSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.message },
      { status: 400 }
    );
  }

  const { name, description } = parsed.data;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const [newProduct] = await Product.create(
      [{ name, description: description ?? "" }],
      { session }
    );

    await session.commitTransaction();

    return NextResponse.json(
      { message: "Product created successfully", product: newProduct },
      { status: 201 }
    );
  } catch (err: unknown) {
    await session.abortTransaction();

    console.error("Error creating product:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to create product" },
      { status: 500 }
    );
  } finally {
    // ✅ Always ends the session, even if commit/abort fails
    session.endSession();
  }
}
