import Layout from "@/components/layouts/Layout-defaul";
import PropertyDetails2 from "@/components/property-details/PropertyDetails2";
import Relatest from "@/components/property-details/Relatest";
import { getPayload } from "payload";
import React from "react";
import config from "@payload-config";
import { Property } from "@/payload-types";

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
      <PropertyDetails2 property={property} />
      <Relatest />
    </Layout>
  );
}
