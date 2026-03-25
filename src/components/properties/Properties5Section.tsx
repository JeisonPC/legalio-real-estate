import { getCities } from "@/lib/queries/cities";
import Properties5 from "../properties/Properties5";
import { getProperties } from "@/lib/queries/properties";

export default async function Properties5Section() {
  try {
    const cities = await getCities();
    console.log("Fetched cities:", cities, Array.isArray(cities));

    const properties = await getProperties();
    console.log("Fetched properties:", properties, Array.isArray(properties));

    return <Properties5 cities={cities ?? []} properties={properties ?? []} />;
  } catch (error) {
    console.error("Properties5Section real error:", error);
    return <div>Error loading data</div>;
  }
}
