import { getPayload } from "payload";
import config from "@/payload.config";

export async function getBedroomOptions() {
  const payload = await getPayload({ config });

  const properties = await payload.find({
    collection: "properties",
    depth: 0,
    limit: 1000,
    select: {
      bedrooms: true,
    },
  });

  const bedrooms = properties.docs
    .map((property) => property.bedrooms)
    .filter((value): value is number => typeof value === "number")
    .sort((a, b) => a - b);

  const uniqueBedrooms = Array.from(new Set(bedrooms));

  return ["Todas", ...uniqueBedrooms.map(String)];
}
