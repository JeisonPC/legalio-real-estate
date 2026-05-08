import PropertiesClient from "./PropertiesClient";
import { getFeaturedProperties } from "@/lib/queries/getFeaturedProperties";

export default async function Properties() {
  const properties = await getFeaturedProperties();

  return <PropertiesClient properties={properties} />;
}
