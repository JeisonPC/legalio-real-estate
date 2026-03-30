import Layout from "@/components/layouts/Layout-defaul";
import PropertyDetails3 from "@/components/property-details/PropertyDetails3";
import Relatest from "@/components/property-details/Relatest";
import React from "react";
import { Property } from "@/payload-types";
import { getPayload } from "payload";
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
    <div className="bg-light-color">
      <Layout>
        <PropertyDetails3 property={property} />
        <Relatest />
      </Layout>
    </div>
  );
}
