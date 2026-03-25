import type { CollectionConfig } from "payload";

export const Countries: CollectionConfig = {
  slug: "countries",
  labels: {
    singular: "País",
    plural: "Países",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "code", "isActive"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      label: "Nombre",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "code",
      label: "Código ISO",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "slug",
      label: "Slug",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "isActive",
      label: "Activo",
      type: "checkbox",
      defaultValue: true,
    },
  ],
};
