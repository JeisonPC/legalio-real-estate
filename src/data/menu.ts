type MenuItem = {
  title: string;
  href?: string;
  links: Array<{
    href?: string;
    label: string;
    isCurrent?: boolean;
    sub?: Array<{ href: string; label: string }>;
  }>;
  isCurrent?: boolean;
};

export const menuItems: MenuItem[] = [
  {
    title: "Inicio",
    links: [
      // { href: "/", label: "Homepage 1", isCurrent: true },
      // { href: "/home02", label: "Homepage 2" },
      // { href: "/home03", label: "Homepage 3" },
      // { href: "/home04", label: "Homepage 4" },
      // { href: "/home05", label: "Homepage 5" },
    ],
    href: "/",
  },
  //   {
  //     title: "Listing",
  //     links: [
  //       {
  //         href: "/listing-topmap-grid",
  //         label: "Listing Topmap Grid",
  //       },
  //       {
  //         href: "/listing-topmap-list",
  //         label: "listing Topmap List",
  //       },
  //       { href: "/listing-left-sidebar", label: "Listing Left Sidebar" },
  //       { href: "/listing-right-sidebar", label: "Listing Right Sidebar" },
  //       { href: "/propiedades", label: "Listing Half Map Grid" },
  //       { href: "/listing-half-map-list", label: "Listing Half Map List" },
  //     ],
  //   },
  {
    title: "Propiedades",
    href: "/propiedades",
    links: [],
  },
  //   {
  //     title: "Pages",
  //     links: [
  //       { href: "/sobre-nosotros", label: "Acerca de" },
  //       { href: "/our-pricing", label: "Our Pricing" },
  //       { href: "/FAQs", label: "FAQs" },
  //       { href: "/politicas-de-privacidad", label: "Políticas de Privacidad" },
  //       { href: "/inicio-sesion", label: "Inicio de Sesión/Registro" },
  //     ],
  //   },
  {
    title: "Blog",
    href: "/blog",
    links: [
      // { href: "/blog-standard", label: "Blog Standard" },
      // { href: "/blog-grid", label: "Blog Grid" },
      // { href: "/blog-list", label: "Blog List" },
      // { href: "/blog-post-1/1", label: "Blog Post 1" },
      // { href: "/blog-post-2/1", label: "Blog Post 2" },
    ],
  },
  {
    title: "Contacto",
    href: "/contacto",
    links: [],
  },
];
