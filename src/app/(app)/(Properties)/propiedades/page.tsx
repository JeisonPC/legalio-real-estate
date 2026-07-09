// import Header from "@/components/header/Header";
import Properties5Section from "@/components/properties/Properties5Section";
import PropertiesPageSkeleton from "./PropertiesPageSkeleton";
import type { Metadata } from "next";
import React, { Suspense } from "react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Propiedades en Palmira, Pradera y Tuluá | Legalio",
  description:
    "Busca casas, apartamentos, locales y propiedades en venta o arriendo en Palmira, Pradera y Tuluá con asesoría inmobiliaria y respaldo legal.",
  alternates: {
    canonical: "/propiedades",
  },
};

export default function page() {
  return (
    <div style={{ marginTop: "140px" }}>
      <section className="tf-container mb_30">
        <h1 className="text_primary-color mb_16">
          Propiedades en Palmira, Pradera y Tuluá
        </h1>
        <p className="text_secondary-color" style={{ maxWidth: "860px" }}>
          Explora casas, apartamentos, locales y oficinas en venta o arriendo en
          el Valle del Cauca. En Legalio combinamos búsqueda inmobiliaria,
          revisión documental y acompañamiento legal para que puedas comparar
          opciones con más tranquilidad.
        </p>
        <div className="d-flex gap_12 flex-wrap mt_24">
          <a className="tf-btn btn-bg-1" href="/arriendos-palmira">
            <span>Arriendos en Palmira</span>
            <span className="bg-effect"></span>
          </a>
          <a className="tf-btn btn-bg-1" href="/propiedades-en-venta-palmira">
            <span>Propiedades en venta</span>
            <span className="bg-effect"></span>
          </a>
          <a className="tf-btn btn-bg-1" href="/propietarios">
            <span>Administrar mi inmueble</span>
            <span className="bg-effect"></span>
          </a>
        </div>
      </section>
      {/* <Header /> */}
      <Suspense fallback={<PropertiesPageSkeleton />}>
        <Properties5Section />
      </Suspense>
    </div>
  );
}
