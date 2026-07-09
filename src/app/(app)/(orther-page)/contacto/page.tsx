import Map3 from "@/components/common/Map3";
import Layout from "@/components/layouts/Layout-defaul";
import FormContact from "@/components/otherpage/contacts/FormContact";
import PageTitle from "@/components/otherpage/contacts/PageTitle";
import LocalBusinessSchema from "@/components/seo/LocalBusinessSchema";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Contacto inmobiliaria en Palmira | Legalio",
    description:
        "Contacta a Legalio en Palmira para arriendos, venta de propiedades, administración de inmuebles y asesoría legal inmobiliaria.",
    alternates: {
        canonical: "/contacto",
    },
};

export default function page() {
    return (
        <Layout>
            <LocalBusinessSchema />
            <PageTitle />
            <div className="tf-container section-contact tf-spacing-1">
                <div className="map-box ">
                    <Map3 />
                </div>
                <FormContact />
            </div>
        </Layout>
    );
}
