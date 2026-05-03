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
            { href: "/propiedades?businessType=Venta", label: "Propiedades a la Venta" },
            { href: "/propiedades?businessType=Arriendo", label: "Propiedades en Arriendo" },
            { href: "/propiedades", label: "Todas las Propiedades" },
            { href: "#", label: "Nuestros Agentes" },
        ],
    },
    {
        className: "quick-link",
        heading: "Acceso Rápido",
        links: [
            { href: "/sobre-nosotros", label: "Acerca de" },
            { href: "/contacto", label: "Contáctanos" },
            { href: "#", label: "Nuestro Equipo" },
            { href: "/blog", label: "Últimas Noticias" },
        ],
    },
];
