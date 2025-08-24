import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Category, { categorySchema } from "@/models/Category";
import { z } from "zod";
import dbConnect from "@/lib/mongodb"; // your DB helper
import { uploadFileToS3 } from "@/lib/api/aws/aws";
import formidable from "formidable";
import fs from "fs";
import path from "path";
import { mkdir, writeFile } from "fs/promises";




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

// Disable Next.js body parser
export const config = { api: { bodyParser: false } };

export async function POST(req: Request) {
  await dbConnect();
  const session = await mongoose.startSession();

  try {
    // Parse multipart/form-data using formidable
    const data: { fields: formidable.Fields; files: formidable.Files } = await new Promise((resolve, reject) => {
      const form = formidable({ multiples: false });
      form.parse(req as any, (err, fields, files) => (err ? reject(err) : resolve({ fields, files })));
    });

    // Validate fields
    const validated = categorySchema.parse({
      name: data.fields.name,
      slug: data.fields.slug,
      parent: data.fields.parent || null,
      description: data.fields.description,
    });

    // Auto-generate slug if not provided
    if (!validated.slug) {
      validated.slug = validated.name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, "");
    }

    // Upload image if present
    let imageUrl: string | undefined;
    const file = data.files.image as formidable.File | formidable.File[] | undefined;
    if (file) {
      const singleFile = Array.isArray(file) ? file[0] : file;
      imageUrl = await uploadFileToS3(singleFile, "categories");
      validated.image = imageUrl;
    }

    // Start transaction
    let newCategory: any = null;
    await session.withTransaction(async () => {
      newCategory = await Category.create([validated], { session });
    });

    session.endSession();
    return NextResponse.json({ success: true, category: newCategory[0] });
  } catch (err: any) {
    await session.abortTransaction();
    session.endSession();

    if (err instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: err.message }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}


export async function PUT(req: Request) {
  await dbConnect();
  const session = await mongoose.startSession();

  try {
    const formData = await req.formData(); // Web API
    const id = formData.get("id")?.toString();
    if (!id) throw new Error("Category ID required");

    const name = formData.get("name")?.toString();
    const parent = formData.get("parent")?.toString() || null;
    const description = formData.get("description")?.toString();

    
    const imageData = formData.get("image");
    let imageUrl: string | undefined;

    console.log("FORM",formData)
    console.log("FORM.image",imageData)
    

    if (imageData && imageData instanceof Blob) {
      
      // Create uploads directory if it doesn't exist
      const uploadDir = path.join(process.cwd(), 'uploads', 'temp');
      try {
        await mkdir(uploadDir, {recursive: true});
      } catch (err) {
        console.log("Upload directory already exists or couldn't be created");
      }

      // Convert File to buffer
      const arrayBuffer = await imageData.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      // Generate unique filename
      const originalFilename = (imageData as any).name || `file-${Date.now()}.jpg`;
      const fileExt = path.extname(originalFilename) || '.jpg';
      const safeFilename = originalFilename.replace(/[^a-zA-Z0-9.-]/g, '_');
      const tempFileName = `temp-${Date.now()}-${safeFilename}`;
      const tempFilePath = path.join(uploadDir, tempFileName);

      // Save buffer to disk (uses disk storage, not RAM)
      await writeFile(tempFilePath, buffer);
      console.log("File saved to disk:", tempFilePath);

      console.log("tempFilePath",tempFilePath)
      console.log("")

       imageUrl = await uploadFileToS3({
        filepath: tempFilePath,
        originalFilename: originalFilename,
        mimetype: (imageData as any).type || "application/octet-stream"
      }, "categories");

      // imageUrl = await uploadFileToS3({ buffer, originalFilename: originalFilename, mimetype: imageData.type }, "categories");
    }

    console.log("IMAGE url", imageUrl)
    // Validate partial fields
    const validated = categorySchema.partial().parse({ name, parent, description, image: imageUrl });

    if (validated.name && !validated.slug) {
      validated.slug = validated.name.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
    }

    let updatedCategory: any = null;
    await session.withTransaction(async () => {
      updatedCategory = await Category.findByIdAndUpdate(id, validated, { new: true, session });
    });

    session.endSession();
    return NextResponse.json({ success: true, category: updatedCategory });
  } catch (err: any) {
    // await session.abortTransaction();
    session.endSession();
    console.error("ERR", err)
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}



// DELETE category
export async function DELETE(req: Request) {
  await dbConnect();
  const session = await mongoose.startSession();

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ success: false, error: "Category ID required" }, { status: 400 });

    await session.withTransaction(async () => {
      await Category.findByIdAndDelete(id, { session });

      // Optional: Remove this as parent in other categories
      await Category.updateMany({ parent: id }, { parent: null }, { session });
    });

    session.endSession();
    return NextResponse.json({ success: true });
  } catch (err: any) {
    await session.abortTransaction();
    session.endSession();
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
