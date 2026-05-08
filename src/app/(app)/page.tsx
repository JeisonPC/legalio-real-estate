// import About from "@/components/homes/homepage-1/About";
// import Banner from "@/components/homes/homepage-1/Banner";
import Hero from "@/components/homes/homepage-5/Hero";
import Location from "@/components/homes/homepage-2/Location";
import Process from "@/components/homes/homepage-1/Process";
import Properties from "@/components/homes/homepage-1/Properties";
// import Properties2 from "@/components/homes/homepage-1/Properties2";
// import Testimonials from "@/components/homes/homepage-1/Testimonials";
// import LatestNews from "@/components/homes/LatestNews";
import Layout from "@/components/layouts/Layout-defaul";
import { getCities } from "@/lib/queries/cities";
import { getProperties } from "@/lib/queries/properties";
import {
  HomeHeroSkeleton,
  HomePropertiesSkeleton,
} from "@/components/common/AppSkeletons";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

async function HomeHero() {
  const [cities, properties] = await Promise.all([getCities(), getProperties()]);

  return <Hero cities={cities} properties={properties} />;
}

export default function Home() {
  return (
    <Layout>
      <Suspense fallback={<HomeHeroSkeleton />}>
        <HomeHero />
      </Suspense>
      {/* <About /> */}
      <Suspense fallback={<HomePropertiesSkeleton />}>
        <Properties />
      </Suspense>
      {/* <Banner /> */}
      {/* <Properties2 /> */}
      <Location />
      <Process />
      {/* <Testimonials /> */}
      {/* <LatestNews /> */}
    </Layout>
  );
}
