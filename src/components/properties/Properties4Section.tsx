import { getCities } from "@/lib/queries/cities";
import { getProperties } from "@/lib/queries/properties";
import Properties4 from "./Properties4";

export default async function Properties4Section() {
  try {
    const cities = await getCities();
    console.log("Fetched cities:", cities, Array.isArray(cities));

    const properties = await getProperties();
    console.log("Fetched properties:", properties, Array.isArray(properties));

    return <Properties4 cities={cities ?? []} properties={properties ?? []} />;
  } catch (error) {
    console.error("Properties4Section real error:", error);
    return <div>Error loading data</div>;
  }
}
