import { getPayload } from "payload";
import config from "@payload-config";
import Properties1 from "./Properties1";

export default async function Properties1Section() {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "properties",
    limit: 1000,
    depth: 2,
    sort: "-createdAt",
  });
  console.log("docs", result.docs.length);

  return <Properties1 properties={result.docs} />;
}
