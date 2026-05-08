// src/lib/queries/properties.ts
import { getPayloadClient } from "@/lib/payload";
import { unstable_cache } from "next/cache";

async function fetchFeaturedProperties() {
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

export const getFeaturedProperties = unstable_cache(
  fetchFeaturedProperties,
  ["featured-properties"],
  {
    revalidate: 300,
    tags: ["properties", "featured-properties"],
  },
);
