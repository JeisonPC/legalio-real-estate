import { getCities } from "@/lib/queries/cities";
import { getProperties } from "@/lib/queries/properties";
import Properties6 from "./Properties6";

export default async function Properties6Section() {
  try {
    const cities = await getCities();
    console.log("Fetched cities:", cities, Array.isArray(cities));

    const properties = await getProperties();
    console.log("Fetched properties:", properties, Array.isArray(properties));

    return <Properties6 cities={cities ?? []} properties={properties ?? []} />;
  } catch (error) {
    console.error("Properties6Section real error:", error);
    return <div>Error loading data</div>;
  }
}