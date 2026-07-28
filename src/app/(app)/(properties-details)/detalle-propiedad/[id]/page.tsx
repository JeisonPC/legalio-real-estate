import React from "react";

import Layout from "@/components/layouts/Layout-defaul";
// import Relatest from "@/components/property-details/Relatest";
import PropertyDetails3 from "@/components/property-details/PropertyDetails3";
import { getMediaUrl } from "@/lib/media/getMediaUrl";
import { getPropertyById } from "@/lib/queries/properties";
import type { Media, Property } from "@/payload-types";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

function capitalize(value?: string | null) {
  if (!value) return "";

  return value.charAt(0).toUpperCase() + value.slice(1);
}

function getCityName(property: Property) {
  return typeof property.city === "object"
    ? String(property.city?.name ?? "")
    : String(property.city ?? "");
}

function getFirstImage(property: Property): Media | undefined {
  const firstImage = property.images?.[0];

  return typeof firstImage === "object" && firstImage !== null
    ? firstImage
    : undefined;
}

function createPropertySeoTitle(property: Property) {
  const cityName = getCityName(property);
  const businessType = capitalize(property.businessType);

  if (cityName) {
    return `${property.title} en ${businessType.toLowerCase()} en ${cityName} | Legalio`;
  }

  return `${property.title} | Legalio`;
}

function createPropertyDescription(property: Property) {
  const cityName = getCityName(property);
  const businessType = capitalize(property.businessType).toLowerCase();
  const propertyType = property.propertyType;
  const location = cityName ? ` en ${cityName}` : "";
  const details = `${property.bedrooms} habitaciones, ${property.bathrooms} baños y ${property.area} m2`;

  return `${capitalize(propertyType)} en ${businessType}${location}. ${details}. Conoce esta propiedad con acompañamiento inmobiliario y respaldo legal de Legalio.`;
}

function createBreadcrumbSchema(property: Property) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: "https://legalio.com.co/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Propiedades",
        item: "https://legalio.com.co/propiedades",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: property.title,
        item: `https://legalio.com.co/detalle-propiedad/${property.id}`,
      },
    ],
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const property = await getPropertyById(id);

  if (!property) notFound();

  const firstImage = getFirstImage(property);
  const imageUrl = firstImage ? getMediaUrl(firstImage, "detail") : undefined;
  const description = createPropertyDescription(property);

  return {
    title: createPropertySeoTitle(property),
    description,
    alternates: {
      canonical: `/detalle-propiedad/${property.id}`,
    },
    openGraph: {
      title: createPropertySeoTitle(property),
      description,
      url: `/detalle-propiedad/${property.id}`,
      type: "website",
      images: imageUrl
        ? [
            {
              url: imageUrl,
              alt: firstImage?.alt || property.title,
            },
          ]
        : undefined,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  const property = await getPropertyById(id);

  if (!property) notFound();

  return (
    <Layout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(createBreadcrumbSchema(property)),
        }}
      />
      <PropertyDetails3 property={property} />
      {/* <Relatest /> */}
    </Layout>
  );
}
