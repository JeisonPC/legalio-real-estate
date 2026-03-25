import { getCities } from "@/lib/queries/cities";
import Properties5 from "../properties/Properties5";
import { getProperties } from "@/lib/queries/properties";

export default async function SearchSection() {
  const cities = await getCities();
  console.log("Fetched cities for SearchSection:", cities);
  const properties = await getProperties();
  return <Properties5 cities={cities} properties={properties} />;
}
