import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },
  upload: {
    mimeTypes: ["image/jpeg", "image/png", "image/webp", "application/pdf"],
    resizeOptions: {
      width: 1600,
      withoutEnlargement: true,
    },
    formatOptions: {
      format: "webp",
      options: {
        quality: 72,
        effort: 5,
      },
    },
    imageSizes: [
      {
        name: "thumbnail",
        width: 320,
        height: 220,
        position: "centre",
        withoutEnlargement: true,
        formatOptions: {
          format: "webp",
          options: {
            quality: 68,
            effort: 5,
          },
        },
      },
      {
        name: "card",
        width: 640,
        height: 430,
        position: "centre",
        withoutEnlargement: true,
        formatOptions: {
          format: "webp",
          options: {
            quality: 70,
            effort: 5,
          },
        },
      },
      {
        name: "detail",
        width: 1200,
        height: 800,
        position: "centre",
        withoutEnlargement: true,
        formatOptions: {
          format: "webp",
          options: {
            quality: 72,
            effort: 5,
          },
        },
      },
    ],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
};
