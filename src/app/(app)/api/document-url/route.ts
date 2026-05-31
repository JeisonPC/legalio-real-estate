import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getPayload } from "payload";
import config from "@/payload.config";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET!,
  },
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const documentId = searchParams.get("id");

    if (!documentId) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("legalio_token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await getPayload({ config });

    const headers = new Headers();
    headers.set("authorization", `JWT ${token}`);

    const { user } = await payload.auth({ headers });

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const doc = await payload.findByID({
      collection: "documents",
      id: documentId,
      depth: 0,
      overrideAccess: true,
    });

    if (!doc) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 },
      );
    }

    if (user.role !== "admin") {
      const allowedUserIds = Array.isArray(doc.users)
        ? doc.users
            .map((relatedUser) => {
              if (
                typeof relatedUser === "string" ||
                typeof relatedUser === "number"
              ) {
                return String(relatedUser);
              }

              if (
                typeof relatedUser === "object" &&
                relatedUser !== null &&
                "id" in relatedUser
              ) {
                return String(relatedUser.id);
              }

              return null;
            })
            .filter(Boolean)
        : [];

      if (!allowedUserIds.includes(String(user.id))) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    }

    if (!doc.filename) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const key = `documents/${doc.filename}`;

    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: key,
    });

    const signedUrl = await getSignedUrl(s3, command, {
      expiresIn: 60,
    });

    return NextResponse.json({ url: signedUrl });
  } catch (error) {
    console.error("document-url error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
