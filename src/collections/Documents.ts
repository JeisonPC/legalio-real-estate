import type { CollectionBeforeValidateHook, CollectionConfig } from "payload";

const getTitleFromFilename = (filename?: string | null) => {
  if (!filename) return null;

  return filename.replace(/\.[^/.]+$/, "").replace(/[-_]+/g, " ").trim();
};

const beforeValidateDocument: CollectionBeforeValidateHook = async ({
  data,
  req,
}) => {
  if (!data) return data;

  if (!data.title) {
    const filename =
      typeof req.file?.name === "string" ? req.file.name : data.filename;

    data.title = getTitleFromFilename(filename) || "Documento";
  }

  if (!data.documentType) {
    data.documentType = "contract";
  }

  return data;
};

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
    defaultColumns: ["title", "documentType", "users", "contract", "createdAt"],
  },
  hooks: {
    beforeValidate: [beforeValidateDocument],
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
      admin: {
        description:
          "Si se deja vacío al subir un archivo, se usará el nombre del archivo.",
      },
    },
    {
      name: "documentType",
      label: "Tipo de documento",
      type: "select",
      required: true,
      defaultValue: "contract",
      options: [
        { label: "Contrato", value: "contract" },
        { label: "Inventario", value: "inventory" },
        { label: "Acta de entrega", value: "handover_record" },
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
      admin: {
        condition: (_, siblingData, { operation }) =>
          operation === "update" || siblingData.documentType !== "contract",
        description:
          "Si el documento se sube desde un contrato, se completan automáticamente los usuarios relacionados.",
      },
    },
    {
      name: "contract",
      label: "Contrato relacionado",
      type: "relationship",
      relationTo: "contracts",
      admin: {
        condition: (_, siblingData, { operation }) =>
          operation === "update" || siblingData.documentType !== "contract",
        description:
          "Puede quedar vacío temporalmente al subir un PDF desde la creación de un contrato.",
      },
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
