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
            { href: "/listing-topmap-grid", label: "Propiedades a la Venta" },
            { href: "/listing-topmap-grid", label: "Property Alquiler" },
            { href: "/listing-topmap-grid", label: "Property For Buy" },
            { href: "/listing-topmap-grid", label: "All Properties" },
            { href: "#", label: "Our Agents" },
        ],
    },
    {
        className: "quick-link",
        heading: "Acceso Rápido",
        links: [
            { href: "/about-us", label: "Acerca de" },
            { href: "/contacts", label: "Contactanos" },
            { href: "#", label: "Our Team" },
            { href: "/blog-standard", label: "Latest News" },
            { href: "/our-pricing", label: "Our Pricing" },
        ],
    },
];
