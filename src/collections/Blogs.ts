import type { CollectionConfig } from "payload";

export const Blogs: CollectionConfig = {
  slug: "blogs",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "status", "publishedAt"],
  },
  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === "admin",
    update: ({ req }) => req.user?.role === "admin",
    delete: ({ req }) => req.user?.role === "admin",
  },
  fields: [
    {
      name: "title",
      label: "Título",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      label: "Slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        description: "Ej: como-arrendar-un-inmueble-sin-riesgos",
      },
    },
    {
      name: "excerpt",
      label: "Resumen",
      type: "textarea",
      required: true,
    },
    {
      name: "coverImage",
      label: "Imagen principal",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "quote",
      type: "textarea",
      label: "Frase destacada",
    },
    {
      name: "quoteAuthor",
      type: "text",
      label: "Autor de la frase",
    },
    {
      name: "content",
      label: "Contenido",
      type: "richText",
      required: true,
    },
    {
      name: "status",
      label: "Estado",
      type: "select",
      defaultValue: "draft",
      options: [
        {
          label: "Borrador",
          value: "draft",
        },
        {
          label: "Publicado",
          value: "published",
        },
      ],
    },
    {
      name: "publishedAt",
      label: "Fecha de publicación",
      type: "date",
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
    {
      name: "author",
      label: "Autor",
      type: "relationship",
      relationTo: "users",
    },
    {
      name: "category",
      label: "Categoría",
      type: "select",
      options: [
        {
          label: "Arrendamiento",
          value: "arrendamiento",
        },
        {
          label: "Compra de vivienda",
          value: "compra-vivienda",
        },
        {
          label: "Propiedad horizontal",
          value: "propiedad-horizontal",
        },
        {
          label: "Legal inmobiliario",
          value: "legal-inmobiliario",
        },
      ],
    },
  ],
};
