import type { CollectionConfig } from "payload";

export const Documents: CollectionConfig = {
  slug: "documents",
  labels: {
    singular: "Documento",
    plural: "Documentos",
  },
  upload: {
    mimeTypes: ["application/pdf", "image/*"],
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "documentType", "users", "lease", "createdAt"],
  },
  access: {
    read: ({ req }) => {
      const user = req.user;

      if (!user) return false;
      if (user.role === "admin") return true;

      return {
        users: {
          equals: user.id,
        },
      };
    },
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
      name: "documentType",
      label: "Tipo de documento",
      type: "select",
      required: true,
      options: [
        { label: "Contrato", value: "contract" },
        { label: "Inventario", value: "inventory" },
        { label: "Solicitud de arrendamiento", value: "application" },
        { label: "Recibo de pago", value: "payment_receipt" },
        { label: "Otro", value: "other" },
      ],
    },
    {
      name: "users",
      label: "Usuarios relacionados",
      type: "relationship",
      relationTo: "users",
      hasMany: true,
      required: true,
    },
    {
      name: "lease",
      label: "Contrato relacionado",
      type: "relationship",
      relationTo: "leases",
    },
    {
      name: "month",
      label: "Mes",
      type: "text",
    },
    {
      name: "year",
      label: "Año",
      type: "number",
    },
  ],
};
