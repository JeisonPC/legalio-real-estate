import FAQs1 from "@/components/common/FAQs1";
import Footer2 from "@/components/footer/Footer2";
import Header2 from "@/components/header/Header2";
import Hero from "@/components/homes/homepage-2/Hero";
import Location from "@/components/homes/homepage-2/Location";
import Populor from "@/components/homes/homepage-2/Populor";
import Properties from "@/components/homes/homepage-2/Properties";
import TopBar from "@/components/homes/homepage-2/TopBar";
import TopProperties from "@/components/homes/TopProperties";
import { getCities } from "@/lib/queries/cities";
import { getProperties } from "@/lib/queries/properties";
import React from "react";

export const dynamic = "force-dynamic";

export default async function page() {
  const [cities, properties] = await Promise.all([getCities(), getProperties()]);

  return (
    <>
      <TopBar />
      <Header2 />
      <Hero cities={cities} properties={properties} />
      <Populor />
      <TopProperties />
      <Properties />
      <Location />
      <div className="section-faqs-1 tf-spacing-2">
        <FAQs1 />
      </div>
      <Footer2 />
    </>
  );
}
