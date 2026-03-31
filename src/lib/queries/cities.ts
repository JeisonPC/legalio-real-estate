// src/lib/queries/cities.ts
import { getPayloadClient } from "@/lib/payload";

export async function getCities() {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "cities",
    where: {
      isActive: { equals: true },
    },
    limit: 1000,
    sort: "name",
    depth: 1,
  });

  return result.docs;
}
