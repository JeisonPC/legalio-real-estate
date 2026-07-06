import type { CollectionAfterChangeHook, CollectionConfig, Where } from "payload";

const getRelationshipId = (value: unknown): string | number | null => {
  if (typeof value === "string" || typeof value === "number") {
    return value;
  }

  if (typeof value === "object" && value !== null && "id" in value) {
    const id = value.id;

    if (typeof id === "string" || typeof id === "number") {
      return id;
    }
  }

  return null;
};

const getRelationshipIds = (value: unknown): Array<string | number> => {
  if (!Array.isArray(value)) {
    const id = getRelationshipId(value);

    return id ? [id] : [];
  }

  return value
    .map((item) => getRelationshipId(item))
    .filter((id): id is string | number => id !== null);
};

const syncContractDocument: CollectionAfterChangeHook = async ({
  doc,
  previousDoc,
  req,
}) => {
  const pdfDocumentId = getRelationshipId(doc.pdfDocument);
  const previousPdfDocumentId = getRelationshipId(previousDoc?.pdfDocument);

  if (
    previousPdfDocumentId &&
    String(previousPdfDocumentId) !== String(pdfDocumentId ?? "")
  ) {
    await req.payload.update({
      collection: "documents",
      id: previousPdfDocumentId,
      data: {
        contract: null,
        users: [],
      },
      overrideAccess: true,
      req,
    });
  }

  if (!pdfDocumentId) {
    return doc;
  }

  const relatedUsers = getRelationshipIds(doc.users)
    .map((id) => Number(id))
    .filter((id) => Number.isFinite(id));

  await req.payload.update({
    collection: "documents",
    id: pdfDocumentId,
    data: {
      documentType: "contract",
      contract: doc.id,
      ...(relatedUsers.length > 0 ? { users: relatedUsers } : {}),
    },
    overrideAccess: true,
    req,
  });

  return doc;
};

export const Contracts: CollectionConfig = {
  slug: "contracts",
  labels: {
    singular: "Contrato",
    plural: "Contratos",
  },
  admin: {
    useAsTitle: "contractCode",
    defaultColumns: [
      "contractCode",
      "users",
      "property",
      "pdfDocument",
      "status",
      "startDate",
      "endDate",
    ],
  },
  hooks: {
    afterChange: [syncContractDocument],
  },
  access: {
    read: ({ req }) => {
      const user = req.user;

      if (!user) return false;
      if (user.role === "admin") return true;

      const contractAccessWhere: Where = {
        users: {
          equals: user.id,
        },
      };

      return contractAccessWhere;
    },
  },
  fields: [
    {
      name: "contractCode",
      label: "Código del contrato",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "property",
      label: "Propiedad",
      type: "relationship",
      relationTo: "properties",
      required: true,
    },
    {
      name: "users",
      label: "Usuarios",
      type: "relationship",
      relationTo: "users",
      hasMany: true,
      required: true,
    },
    {
      name: "startDate",
      label: "Fecha de inicio",
      type: "date",
      required: true,
    },
    {
      name: "endDate",
      label: "Fecha de finalización",
      type: "date",
      required: true,
    },
    {
      name: "monthlyRent",
      label: "Canon mensual",
      type: "number",
      required: true,
      min: 0,
    },
    {
      name: "depositValue",
      label: "Depósito",
      type: "number",
      min: 0,
    },
    {
      name: "status",
      label: "Estado",
      type: "select",
      required: true,
      defaultValue: "active",
      options: [
        { label: "Activo", value: "active" },
        { label: "Finalizado", value: "ended" },
        { label: "Suspendido", value: "suspended" },
        { label: "En mora", value: "late" },
      ],
    },
    {
      name: "pdfDocument",
      label: "PDF del contrato",
      type: "upload",
      relationTo: "documents",
      admin: {
        description:
          "Selecciona un documento existente o sube el PDF. Al guardar, se asociará automáticamente a este contrato y sus usuarios relacionados.",
      },
    },
    {
      name: "notes",
      label: "Observaciones",
      type: "textarea",
    },
  ],
};
