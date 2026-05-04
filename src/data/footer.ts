export type FooterLink = {
  href: string;
  label: string;
};

export type FooterSection = {
  className: string;
  heading: string;
  links: FooterLink[];
};

export const footerSections: FooterSection[] = [
  {
    className: "company",
    heading: "Nuestra Compañía",
    links: [
      {
        href: "/propiedades-en-venta-palmira",
        label: "Propiedades a la Venta",
      },
      {
        href: "/arriendos-palmira",
        label: "Propiedades en Arriendo",
      },
      { href: "/propiedades", label: "Todas las Propiedades" },
      { href: "/nuestro-equipo", label: "Nuestro Equipo" },
      { href: "/politicas-de-privacidad", label: "Políticas de Privacidad" },
    ],
  },
  {
    className: "quick-link",
    heading: "Acceso Rápido",
    links: [
      { href: "/sobre-nosotros", label: "Sobre nosotros" },
      { href: "/contacto", label: "Contáctanos" },
      { href: "/preguntas-frecuentes", label: "Preguntas frecuentes" },
      { href: "/blog", label: "Últimas Noticias" },
      { href: "/propietarios", label: "Administren mi propiedad" },
    ],
  },
];
