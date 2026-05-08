// src/lib/queries/cities.ts
import { getPayloadClient } from "@/lib/payload";
import { unstable_cache } from "next/cache";

async function fetchCitiesForSection() {
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

  const cities = await Promise.all(
    result.docs.map(async (city) => {
      const properties = await payload.find({
        collection: "properties",
        where: {
          city: {
            equals: city.id,
          },
        },
        limit: 0,
      });

      return {
        id: city.id,
        name: city.name,
        slug: city.slug,
        image: city.image,
        propertiesCount: properties.totalDocs,
      };
    }),
  );

  return cities;
}

export const getCitiesForSection = unstable_cache(
  fetchCitiesForSection,
  ["cities-for-section"],
  {
    revalidate: 300,
    tags: ["cities", "properties", "cities-for-section"],
  },
);
