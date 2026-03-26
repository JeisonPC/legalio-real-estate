import { getCities } from "@/lib/queries/cities";
import { getProperties } from "@/lib/queries/properties";
import Properties2 from "./Properties2";

export default async function Properties2Section() {
  try {
    const cities = await getCities();
    console.log("Fetched cities:", cities, Array.isArray(cities));

    const properties = await getProperties();
    console.log("Fetched properties:", properties, Array.isArray(properties));

    return <Properties2 cities={cities ?? []} properties={properties ?? []} />;
  } catch (error) {
    console.error("Properties2Section real error:", error);
    return <div>Error loading data</div>;
  }
}
