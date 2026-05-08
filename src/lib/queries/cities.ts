// src/lib/queries/cities.ts
import { getPayloadClient } from "@/lib/payload";
import { unstable_cache } from "next/cache";

async function fetchCities() {
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

export const getCities = unstable_cache(fetchCities, ["cities"], {
  revalidate: 300,
  tags: ["cities"],
});
