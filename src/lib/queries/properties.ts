// src/lib/queries/cities.ts
import { getPayloadClient } from "@/lib/payload";

export async function getProperties() {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "properties",
    limit: 1000,
    sort: "name",
    depth: 1,
  });

  console.log("Fetched properties:", result.docs);

  return result.docs;
}
