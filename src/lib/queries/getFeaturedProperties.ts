// src/lib/queries/properties.ts
import { getPayloadClient } from "@/lib/payload";

export async function getFeaturedProperties() {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "properties",
    where: {
      featured: { equals: true },
    },
    limit: 6,
    depth: 2,
    sort: "-createdAt",
  });

  return result.docs;
}
