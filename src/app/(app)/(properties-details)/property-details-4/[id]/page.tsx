import Layout from "@/components/layouts/Layout-defaul";
import PropertyDetails4 from "@/components/property-details/PropertyDetails4";
import Relatest from "@/components/property-details/Relatest";
import { Property } from "@/payload-types";
import { getPayload } from "payload";
import React from "react";
import config from "@payload-config";


type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  const payload = await getPayload({ config });

  const result = await payload.findByID({
    collection: "properties",
    id,
    depth: 2,
  });

  const property = result as Property;

  return (
    <Layout>
      <PropertyDetails4 property={property} />
      <Relatest />
    </Layout>
  );
}