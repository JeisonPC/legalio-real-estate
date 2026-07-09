import type { Metadata } from "next";

import LocalMarketPage from "@/components/seo/LocalMarketPage";

const whatsappBaseUrl = "https://wa.me/573046035418";

function whatsappUrl(message: string) {
  return `${whatsappBaseUrl}?text=${encodeURIComponent(message)}`;
}

export const metadata: Metadata = {
  title: "Casas y apartamentos en venta en Palmira | Legalio",
  description:
    "Compra casas, apartamentos y propiedades en venta en Palmira, Valle del Cauca. Asesoría inmobiliaria con respaldo legal de Legalio.",
  alternates: {
    canonical: "/propiedades-en-venta-palmira",
  },
  openGraph: {
    title: "Casas y apartamentos en venta en Palmira | Legalio",
    description:
      "Casas, apartamentos y propiedades en venta en Palmira con asesoría inmobiliaria y respaldo legal.",
    url: "/propiedades-en-venta-palmira",
    type: "website",
  },
};

const faqs = [
  {
    question: "¿Legalio vende propiedades en Palmira?",
    answer:
      "Sí. Acompañamos la compra y venta de casas, apartamentos y otros inmuebles en Palmira y el Valle del Cauca.",
  },
  {
    question: "¿Qué respaldo legal recibo al comprar?",
    answer:
      "Revisamos documentación clave y acompañamos el proceso para reducir riesgos jurídicos antes de avanzar con la operación.",
  },
  {
    question: "¿Puedo vender mi propiedad con Legalio?",
    answer:
      "Sí. Te ayudamos con publicación, gestión comercial, atención de interesados y acompañamiento legal durante la venta.",
  },
];

export default function PropiedadesEnVentaPalmiraPage() {
  return (
    <LocalMarketPage
      eyebrow="Propiedades en venta en Palmira"
      title="Casas y apartamentos en venta en Palmira"
      description="Compra propiedades en Palmira, Valle del Cauca, con asesoría inmobiliaria y respaldo legal. Te ayudamos a encontrar opciones, revisar documentos y tomar una decisión más segura."
      serviceLabel="Venta de propiedades"
      initialBusinessType="Venta"
      basePath="/propiedades-en-venta-palmira"
      primaryCta={{
        href: whatsappUrl(
          "Hola Legalio, estoy buscando casas o apartamentos en venta en Palmira.",
        ),
        label: "Escribir por WhatsApp",
      }}
      secondaryCta={{
        href: whatsappUrl(
          "Hola Legalio, quiero vender mi propiedad en Palmira.",
        ),
        label: "Quiero vender mi propiedad",
      }}
      highlights={[
        "Casas y apartamentos en venta",
        "Revisión documental",
        "Acompañamiento comercial y legal",
      ]}
      listingTitle="Propiedades disponibles para venta en Palmira"
      listingDescription="Consulta inmuebles disponibles para compra. Si tienes un presupuesto, barrio o tipo de propiedad definido, Legalio te ayuda a evaluar opciones con mayor tranquilidad."
      faqs={faqs}
    />
  );
}
