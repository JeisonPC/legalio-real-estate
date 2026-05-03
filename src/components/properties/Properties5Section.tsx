import { getCities } from "@/lib/queries/cities";
import Properties5 from "../properties/Properties5";
import { getProperties } from "@/lib/queries/properties";

type Properties5SectionProps = {
  initialCity?: string;
  initialBusinessType?: string;
  basePath?: string;
};

export default async function Properties5Section({
  initialCity,
  initialBusinessType,
  basePath,
}: Properties5SectionProps = {}) {
  try {
    const cities = await getCities();
    const properties = await getProperties();

    return (
      <Properties5
        cities={cities ?? []}
        properties={properties ?? []}
        initialCity={initialCity}
        initialBusinessType={initialBusinessType}
        basePath={basePath}
      />
    );
  } catch (error) {
    console.error("Properties5Section real error:", error);
    return <div>Error loading data</div>;
  }
}
