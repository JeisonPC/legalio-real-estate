import React from "react";
import { getPayload } from "payload";
import config from "@payload-config";
import type { Property } from "@/payload-types";

import Layout from "@/components/layouts/Layout-defaul";
import PropertyDetails1 from "@/components/property-details/PropertyDetails1";
import Relatest from "@/components/property-details/Relatest";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

type PropertyDetailsData = React.ComponentProps<
  typeof PropertyDetails1
>["property"];

function mapProperty(property: Property): PropertyDetailsData {
  const coordinates: [number, number] =
    Array.isArray(property.location) && property.location.length === 2
      ? [property.location[0], property.location[1]]
      : [-76.532, 3.4516];

  return {
    id: property.id,
    title: property.title,
    price: property.price,
    coordinates,
    address: property.address || "",
    bedrooms: property.bedrooms || 0,
    bathrooms: property.bathrooms || 0,
    area: property.area || 0,
    garages: property.garages || 0,
    city: property.city || "",
    type: property.businessType || "",
    propertyType: property.propertyType || "",
    imgSrc:
      Array.isArray(property.images) &&
      property.images.length > 0 &&
      typeof property.images[0] === "object" &&
      property.images[0]?.url
        ? property.images[0].url
        : "/assets/images/placeholder.jpg",
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  const payload = await getPayload({ config });

  const result = await payload.findByID({
    collection: "properties",
    id,
    depth: 2,
  });

  const property = mapProperty(result);

  return (
    <Layout>
      <PropertyDetails1 property={property} />
      <Relatest />
    </Layout>
  );
}

export async function generateStaticParams() {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "properties",
    limit: 1000,
    depth: 0,
  });

  return result.docs.map((property) => ({
    id: String(property.id),
  }));
}
