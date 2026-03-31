import type { CollectionConfig } from "payload";

export const Cities: CollectionConfig = {
  slug: "cities",
  labels: {
    singular: "Ciudad",
    plural: "Ciudades",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "department", "isActive"],
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
    },
    {
      name: "slug",
      label: "Slug",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "department",
      label: "Departamento",
      type: "relationship",
      relationTo: "departments",
      required: true,
    },
    {
      name: "isActive",
      label: "Activo",
      type: "checkbox",
      defaultValue: true,
    },
    {
      name: "location",
      label: "Ubicación",
      type: "point",
    },
    {
      name: "image",
      type: "relationship",
      relationTo: "media",
    },
  ],
};
