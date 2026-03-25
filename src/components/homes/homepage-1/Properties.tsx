import { getPayload } from "payload";
import config from "@payload-config";
import PropertiesClient from "./PropertiesClient";
import { getCities } from "@/lib/queries/cities";

export default async function Properties() {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "properties",
    where: {
      featured: {
        equals: true,
      },
    },
    limit: 6,
    depth: 2,
    sort: "-createdAt",
  });

  const cities = await getCities();
  console.log("Fetched cities in Properties component:", cities);

  return <PropertiesClient properties={result.docs}/>;
}
