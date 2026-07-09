import Layout from "@/components/layouts/Layout-defaul";
import Faqs from "@/components/otherpage/FAQs/Faqs";
import PageTitle from "@/components/otherpage/FAQs/PageTitle";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Preguntas frecuentes sobre arriendos y compraventa | Legalio",
    description:
        "Resuelve dudas frecuentes sobre arriendos, compra de vivienda, administración de inmuebles y procesos legales inmobiliarios con Legalio.",
    alternates: {
        canonical: "/preguntas-frecuentes",
    },
};

export default function page() {
    return (
        <Layout>
            <PageTitle />
            <Faqs />
        </Layout>
    );
}
