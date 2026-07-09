import type { Metadata } from "next";

import LocalMarketPage from "@/components/seo/LocalMarketPage";

const whatsappBaseUrl = "https://wa.me/573046035418";

function whatsappUrl(message: string) {
  return `${whatsappBaseUrl}?text=${encodeURIComponent(message)}`;
}

export const metadata: Metadata = {
  title: "Casas y apartamentos en arriendo en Palmira | Legalio",
  description:
    "Encuentra casas y apartamentos en arriendo en Palmira, Valle del Cauca. Legalio te acompaña con asesoría inmobiliaria y respaldo legal.",
  alternates: {
    canonical: "/arriendos-palmira",
  },
  openGraph: {
    title: "Casas y apartamentos en arriendo en Palmira | Legalio",
    description:
      "Casas y apartamentos en arriendo en Palmira con acompañamiento inmobiliario y respaldo legal.",
    url: "/arriendos-palmira",
    type: "website",
  },
};

const faqs = [
  {
    question: "¿Legalio arrienda inmuebles en Palmira?",
    answer:
      "Sí. Acompañamos la búsqueda de casas, apartamentos y otros inmuebles en arriendo en Palmira, Valle del Cauca.",
  },
  {
    question: "¿También revisan contratos de arrendamiento?",
    answer:
      "Sí. Nuestro enfoque combina gestión inmobiliaria con respaldo legal para que el contrato y la documentación estén claros antes de firmar.",
  },
  {
    question: "¿Puedo publicar mi inmueble para arriendo?",
    answer:
      "Sí. Si eres propietario, puedes solicitar evaluación para arrendar tu inmueble con filtros de inquilino, gestión comercial y soporte jurídico.",
  },
];

export default function ArriendosPalmiraPage() {
  return (
    <LocalMarketPage
      eyebrow="Arriendos en Palmira"
      title="Casas y apartamentos en arriendo en Palmira"
      description="Encuentra inmuebles en arriendo en Palmira, Valle del Cauca, con acompañamiento profesional. En Legalio te ayudamos a elegir, revisar documentos y avanzar con mayor seguridad jurídica."
      serviceLabel="Arriendo de inmuebles"
      initialBusinessType="Arriendo"
      basePath="/arriendos-palmira"
      primaryCta={{
        href: whatsappUrl(
          "Hola Legalio, estoy buscando casas o apartamentos en arriendo en Palmira.",
        ),
        label: "Escribir por WhatsApp",
      }}
      secondaryCta={{
        href: whatsappUrl(
          "Hola Legalio, quiero arrendar mi inmueble en Palmira.",
        ),
        label: "Quiero arrendar mi inmueble",
      }}
      highlights={[
        "Casas y apartamentos en Palmira",
        "Asesoría legal inmobiliaria",
        "Acompañamiento hasta la firma",
      ]}
      listingTitle="Inmuebles disponibles para arriendo en Palmira"
      listingDescription="Explora propiedades disponibles para arriendo. Si buscas una zona, presupuesto o tipo de inmueble específico, nuestro equipo puede ayudarte a filtrar opciones con mejor criterio."
      faqs={faqs}
    />
  );
}
