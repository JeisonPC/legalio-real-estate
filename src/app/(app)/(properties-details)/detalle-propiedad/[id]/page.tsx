import React from "react";

import Layout from "@/components/layouts/Layout-defaul";
// import Relatest from "@/components/property-details/Relatest";
import PropertyDetails3 from "@/components/property-details/PropertyDetails3";
import { getPropertyById } from "@/lib/queries/properties";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  const property = await getPropertyById(id);

  if (!property) notFound();

  return (
    <Layout>
      <PropertyDetails3 property={property} />
      {/* <Relatest /> */}
    </Layout>
  );
}
