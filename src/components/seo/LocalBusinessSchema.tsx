const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Legalio",
  url: "https://legalio.com.co",
  telephone: "+573046035418",
  email: "contacto@legalio.com.co",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Calle 3 28-131",
    addressLocality: "Palmira",
    addressRegion: "Valle del Cauca",
    addressCountry: "CO",
  },
  areaServed: ["Palmira", "Pradera", "Tuluá", "Valle del Cauca"],
  knowsAbout: [
    "arriendos en Palmira",
    "venta de propiedades en Palmira",
    "administracion de inmuebles",
    "asesoria legal inmobiliaria",
  ],
};

export default function LocalBusinessSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(localBusinessSchema),
      }}
    />
  );
}
