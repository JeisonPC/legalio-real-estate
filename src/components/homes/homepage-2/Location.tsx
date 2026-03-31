import React from "react";
import LocationSlider from "./LocationSlider";
import { getCitiesForSection } from "@/lib/queries/getCitiesForSection";

export default async function Location() {
  const cities = await getCitiesForSection();
  
  return <LocationSlider cities={cities} />;
}
