import type { CollectionConfig } from "payload";

export const Departments: CollectionConfig = {
  slug: "departments",
  labels: {
    singular: "Departamento",
    plural: "Departamentos",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "country", "isActive"],
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
      name: "country",
      label: "País",
      type: "relationship",
      relationTo: "countries",
      required: true,
    },
    {
      name: "isActive",
      label: "Activo",
      type: "checkbox",
      defaultValue: true,
    },
  ],
};
