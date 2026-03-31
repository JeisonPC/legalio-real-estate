import cloudinary from "@/lib/cloudinary/cloudinary";
import { NextResponse } from "next/server";
import path from "path";

export async function GET() {
  try {
    const imagePath = path.join(process.cwd(), "public", "test-image.jpg");

    const result = await cloudinary.uploader.upload(imagePath, {
      folder: "legalio/test",
      resource_type: "image",
    });

    return NextResponse.json({
      ok: true,
      public_id: result.public_id,
      secure_url: result.secure_url,
    });
  } catch (error: any) {
    console.error("Cloudinary upload error:", error);

    return NextResponse.json(
      {
        ok: false,
        message: error?.message || "Error desconocido",
        name: error?.name || null,
        http_code: error?.http_code || null,
      },
      { status: 500 },
    );
  }
}
