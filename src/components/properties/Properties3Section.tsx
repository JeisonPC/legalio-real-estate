import { getCities } from "@/lib/queries/cities";
import { getProperties } from "@/lib/queries/properties";
import Properties3 from "./Properties3";

export default async function Properties3Section() {
  try {
    const cities = await getCities();
    console.log("Fetched cities:", cities, Array.isArray(cities));

    const properties = await getProperties();
    console.log("Fetched properties:", properties, Array.isArray(properties));

    return <Properties3 cities={cities ?? []} properties={properties ?? []} />;
  } catch (error) {
    console.error("Properties3Section real error:", error);
    return <div>Error loading data</div>;
  }
}
