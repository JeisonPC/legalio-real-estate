import React from "react";
import { getPayload } from "payload";
import config from "@payload-config";
import type { Property } from "@/payload-types";

import Layout from "@/components/layouts/Layout-defaul";
import Relatest from "@/components/property-details/Relatest";
import PropertyDetails3 from "@/components/property-details/PropertyDetails3";

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
      <PropertyDetails3 property={property} />
      <Relatest />
    </Layout>
  );
}