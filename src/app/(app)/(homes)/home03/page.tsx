import Process1 from "@/components/common/Process1";
import Footer3 from "@/components/footer/Footer3";
import Header3 from "@/components/header/Header3";
import Agents from "@/components/homes/homepage-3/Agents";
import Categories from "@/components/homes/homepage-3/Categories";
import Hero from "@/components/homes/homepage-3/Hero";
import LatestNew from "@/components/homes/homepage-3/LatestNews";
import Properties from "@/components/homes/homepage-3/Properties";
import TopProperties from "@/components/homes/TopProperties";
import { getCities } from "@/lib/queries/cities";
import React from "react";

export default async function page() {
    const cities = await getCities();

    return (
        <>
            <Header3 />
            <Hero cities={cities} />
            <Properties />
            <Categories />
            <Process1 />
            <TopProperties />
            <Agents />
            <LatestNew />
            <Footer3 />
        </>
    );
}
