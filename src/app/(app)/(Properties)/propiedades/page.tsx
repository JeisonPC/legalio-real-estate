// import Header from "@/components/header/Header";
import Properties5Section from "@/components/properties/Properties5Section";
import PropertiesPageSkeleton from "./PropertiesPageSkeleton";
import type { Metadata } from "next";
import React, { Suspense } from "react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Propiedades en Palmira | Casas y apartamentos | Legalio",
  description:
    "Busca casas, apartamentos y propiedades en venta o arriendo en Palmira, Valle del Cauca. Asesoría inmobiliaria con respaldo legal.",
  alternates: {
    canonical: "/propiedades",
  },
};

export default function page() {
  return (
    <div style={{ marginTop: "140px" }}>
      {/* <Header /> */}
      <Suspense fallback={<PropertiesPageSkeleton />}>
        <Properties5Section />
      </Suspense>
    </div>
  );
}
