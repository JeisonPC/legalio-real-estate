import { getPayloadClient } from "@/lib/payload";
import type { Property } from "@/payload-types";
import { unstable_cache } from "next/cache";

async function fetchProperties() {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "properties",
    limit: 1000,
    sort: "name",
    depth: 1,
  });

  return result.docs;
}

export const getProperties = unstable_cache(fetchProperties, ["properties"], {
  revalidate: 300,
  tags: ["properties"],
});

async function fetchPropertyById(id: string): Promise<Property | null> {
  const payload = await getPayloadClient();

  try {
    return await payload.findByID({
      collection: "properties",
      id,
      depth: 2,
    });
  } catch {
    return null;
  }
}

export const getPropertyById = unstable_cache(
  fetchPropertyById,
  ["property-by-id"],
  {
    revalidate: 300,
    tags: ["properties"],
  },
);
