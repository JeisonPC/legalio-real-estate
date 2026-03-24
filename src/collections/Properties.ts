import type { CollectionConfig } from "payload";

export const Properties: CollectionConfig = {
  slug: "properties",

  labels: {
    singular: "Propiedad",
    plural: "Propiedades",
  },

  admin: {
    useAsTitle: "title",
  },

  fields: [
    {
      name: "title",
      label: "Título",
      type: "text",
      required: true,
    },
    {
      name: "address",
      label: "Dirección",
      type: "text",
      required: true,
    },
    {
      name: "city",
      label: "Ciudad",
      type: "text",
      required: true,
    },
    {
      name: "price",
      label: "Precio",
      type: "number",
      required: true,
      min: 0,
    },
    {
      name: "propertyType",
      label: "Tipo de propiedad",
      type: "select",
      required: true,
      options: [
        { label: "Casa", value: "casa" },
        { label: "Apartamento", value: "apartamento" },
        { label: "Oficina", value: "oficina" },
        { label: "Local", value: "local" },
      ],
    },
    {
      name: "businessType",
      label: "Operación",
      type: "select",
      required: true,
      options: [
        { label: "Venta", value: "venta" },
        { label: "Arriendo", value: "arriendo" },
      ],
    },
    {
      name: "images",
      label: "Imágenes",
      type: "relationship",
      relationTo: "media",
      hasMany: true,
    },
    {
      name: "bedrooms",
      label: "Habitaciones",
      type: "number",
      min: 0,
      required: true,
    },
    {
      name: "bathrooms",
      label: "Baños",
      type: "number",
      min: 0,
      required: true,
    },
    {
      name: "area",
      label: "Área (m²)",
      type: "number",
      min: 0,
      required: true,
    },
    {
      name: "garages",
      label: "Parqueaderos",
      type: "number",
      min: 0,
      defaultValue: 0,
    },
    {
      name: "estrato",
      label: "Estrato",
      type: "select",
      required: true,
      options: [
        { label: "1", value: "1" },
        { label: "2", value: "2" },
        { label: "3", value: "3" },
        { label: "4", value: "4" },
        { label: "5", value: "5" },
        { label: "6", value: "6" },
      ],
    },
    {
      name: "location",
      label: "Ubicación en mapa",
      type: "point",
    },
    {
      name: "features",
      label: "Características",
      type: "array",
      fields: [
        {
          name: "value",
          label: "Característica",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "description",
      label: "Descripción",
      type: "textarea",
    },
  ],
};
