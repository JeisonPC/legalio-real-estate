import { getPayload } from "payload";
import config from "@payload-config";

export async function GET() {
  await getPayload({ config });

  return Response.json({
    message: "This is an example of a custom route.",
  });
}
