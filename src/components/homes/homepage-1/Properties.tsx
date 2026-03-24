import { getPayload } from "payload";
import config from "@payload-config";
import PropertiesClient from "./PropertiesClient";

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

  console.log("Featured Properties:", result.docs);

  return <PropertiesClient properties={result.docs} />;
}
