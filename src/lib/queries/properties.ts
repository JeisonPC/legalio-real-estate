import { getPayloadClient } from "@/lib/payload";

export async function getProperties() {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "properties",
    limit: 1000,
    sort: "name",
    depth: 1,
  });

  return result.docs;
}
