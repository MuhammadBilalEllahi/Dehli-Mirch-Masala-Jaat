import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import formidable from "formidable";
import fs from "fs";
import path from "path";

// AWS S3 config
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const config = {
  api: {
    bodyParser: false, // Important: Next.js should not parse the body
  },
};


export async function POST(req: Request) {
  try {
    const form = formidable({ multiples: false });

    const data = await new Promise<{ file: File }>((resolve, reject) => {
      form.parse(req as any, (err, fields, files) => {
        if (err) return reject(err);

        // Cast to single file
        const file = (files.file as File | File[] | undefined);
        if (!file) return reject(new Error("No file uploaded"));

        // If it’s an array, take the first
        resolve({ file: Array.isArray(file) ? file[0] : file });
      });
    });

    
    // Use .filepath or .path depending on version
    const filePath = (data.file as any).filepath || (data.file as any).path;
    if (!filePath) throw new Error("File path not found");

    
    const originalFilename = (data.file as any).originalFilename || (data.file as any).originalFilename;
    if (!originalFilename) throw new Error("File path not found");

    
    const mimeType = (data.file as any).mimeType || (data.file as any).mimeType;
    if (!mimeType) throw new Error("File path not found");

    const fileStream = fs.createReadStream(filePath);
    const fileExt = path.extname(originalFilename || "jpg");
    const fileName = `categories/${Date.now()}${fileExt}`;

    const letsConsole = await s3.send(new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: fileName,
      Body: fileStream,
      ContentType: mimeType || "image/jpeg",
      ACL: "public-read",
    }));

    console.log("letsConsole",letsConsole)
    const url = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
    return NextResponse.json({ success: true, url });

  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}