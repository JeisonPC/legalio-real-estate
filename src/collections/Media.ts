import type { CollectionConfig } from "payload";
import path from "path";
import cloudinary from "@/lib/cloudinary/cloudinary";

export const Media: CollectionConfig = {
  slug: "media",
  upload: {
    staticDir: "media",
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
    {
      name: "cloudinaryPublicId",
      type: "text",
      admin: { readOnly: true },
    },
    {
      name: "cloudinaryUrl",
      type: "text",
      admin: { readOnly: true },
    },
    {
      name: "cloudinarySecureUrl",
      type: "text",
      admin: { readOnly: true },
    },
    {
      name: "bytes",
      type: "number",
      admin: { readOnly: true },
    },
    {
      name: "format",
      type: "text",
      admin: { readOnly: true },
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, req, operation }) => {
        if (operation !== "create" && operation !== "update") {
          return doc;
        }

        if (!doc?.filename) {
          return doc;
        }

        if (doc.cloudinarySecureUrl && doc.cloudinaryPublicId) {
          return doc;
        }

        try {
          const localPath = path.join(process.cwd(), "media", doc.filename);

          const result = await cloudinary.uploader.upload(localPath, {
            folder: "legalio/media",
            resource_type: "image",
          });

          const updatedDoc = await req.payload.update({
            collection: "media",
            id: doc.id,
            data: {
              cloudinaryPublicId: result.public_id,
              cloudinaryUrl: result.url,
              cloudinarySecureUrl: result.secure_url,
              bytes: result.bytes,
              format: result.format,
            },
            req,
          });

          return updatedDoc;
        } catch (error) {
          console.error("Error subiendo a Cloudinary:", error);
          return doc;
        }
      },
    ],
  },
};
