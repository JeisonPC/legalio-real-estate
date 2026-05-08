import type { City, Property } from "@/payload-types";

export const ALL_CITIES_OPTION = "Todas las Ciudades";
export const ALL_BEDROOMS_OPTION = "Todas las Habitaciones";
export const ALL_BATHROOMS_OPTION = "Todos los Baños";
export const ALL_GARAGES_OPTION = "Todos los Garajes";
export const MAX_PRICE_OPTION = "Precio Max.";
export const MIN_SIZE_OPTION = "Min (Mts/2)";
export const MAX_SIZE_OPTION = "Max (Mts/2)";

export type PropertyFilterOptions = {
  businessTypeOptions: string[];
  cityOptions: string[];
  bedroomOptions: string[];
  bathroomOptions: string[];
  garageOptions: string[];
  priceOptions: string[];
  minSizeOptions: string[];
  maxSizeOptions: string[];
  featureOptions: string[];
};

function uniqueSortedNumbers(values: Array<number | null | undefined>) {
  return Array.from(
    new Set(
      values.filter(
        (value): value is number =>
          typeof value === "number" && Number.isFinite(value),
      ),
    ),
  ).sort((a, b) => a - b);
}

function uniqueSortedStrings(values: Array<string | null | undefined>) {
  return Array.from(
    new Set(
      values
        .map((value) => value?.trim())
        .filter((value): value is string => Boolean(value)),
    ),
  ).sort((a, b) => a.localeCompare(b, "es"));
}

function formatNumber(value: number) {
  return value.toLocaleString("en-US");
}

function formatBusinessType(value: string) {
  const normalized = value.trim().toLowerCase();

  if (normalized === "venta") return "Venta";
  if (normalized === "arriendo" || normalized === "alquiler") return "Arriendo";

  return value;
}

function getPropertyCityName(property: Property) {
  return typeof property.city === "object"
    ? String(property.city?.name ?? "")
    : String(property.city ?? "");
}

export function buildPropertyFilterOptions(
  properties: Property[],
  cities: City[] = [],
): PropertyFilterOptions {
  const cityNames = uniqueSortedStrings([
    ...cities.map((city) => city.name),
    ...properties.map(getPropertyCityName),
  ]);
  const businessTypes = uniqueSortedStrings(
    properties.map((property) => property.businessType).map(formatBusinessType),
  );
  const bedrooms = uniqueSortedNumbers(
    properties.map((property) => property.bedrooms),
  );
  const bathrooms = uniqueSortedNumbers(
    properties.map((property) => property.bathrooms),
  );
  const garages = uniqueSortedNumbers(
    properties.map((property) => property.garages),
  );
  const prices = uniqueSortedNumbers(
    properties.map((property) => property.price),
  );
  const areas = uniqueSortedNumbers(properties.map((property) => property.area));
  const features = uniqueSortedStrings(
    properties.flatMap((property) =>
      Array.isArray(property.features)
        ? property.features.map((feature) => feature?.value)
        : [],
    ),
  );

  return {
    businessTypeOptions: ["Ambos", ...businessTypes],
    cityOptions: [ALL_CITIES_OPTION, ...cityNames],
    bedroomOptions: [ALL_BEDROOMS_OPTION, ...bedrooms.map(String)],
    bathroomOptions: [ALL_BATHROOMS_OPTION, ...bathrooms.map(String)],
    garageOptions: [ALL_GARAGES_OPTION, ...garages.map(String)],
    priceOptions: [
      MAX_PRICE_OPTION,
      ...prices.map((price) => `$${formatNumber(price)}`),
    ],
    minSizeOptions: [
      MIN_SIZE_OPTION,
      ...areas.map((area) => `${formatNumber(area)} Mts/2`),
    ],
    maxSizeOptions: [
      MAX_SIZE_OPTION,
      ...areas.map((area) => `${formatNumber(area)} Mts/2`),
    ],
    featureOptions: features,
  };
}
