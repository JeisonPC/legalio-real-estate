import type {
  CollectionAfterChangeHook,
  CollectionBeforeValidateHook,
  CollectionConfig,
  Where,
} from "payload";
import {
  ensureMonthlyReceiptPDF,
  issueMonthlyReceipt,
} from "@/lib/monthlyReceipts/issueMonthlyReceipt";

const MONTH_OPTIONS = [
  { label: "Enero", value: "1" },
  { label: "Febrero", value: "2" },
  { label: "Marzo", value: "3" },
  { label: "Abril", value: "4" },
  { label: "Mayo", value: "5" },
  { label: "Junio", value: "6" },
  { label: "Julio", value: "7" },
  { label: "Agosto", value: "8" },
  { label: "Septiembre", value: "9" },
  { label: "Octubre", value: "10" },
  { label: "Noviembre", value: "11" },
  { label: "Diciembre", value: "12" },
];

const getYearOptions = () => {
  const currentYear = new Date().getFullYear();

  return Array.from({ length: 10 }, (_, index) => {
    const year = currentYear - 2 + index;

    return {
      label: String(year),
      value: String(year),
    };
  });
};

const toNumber = (value: unknown): number | undefined => {
  const parsedValue = typeof value === "string" ? Number(value) : value;

  return typeof parsedValue === "number" && Number.isFinite(parsedValue)
    ? parsedValue
    : undefined;
};

const toStringValue = (value: unknown): string | null => {
  if (typeof value === "string" && value.trim().length > 0) {
    return value;
  }

  if (typeof value === "number" && Number.isFinite(value)) {
    return String(value);
  }

  return null;
};

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

const formatReceiptNumber = (periodYear?: unknown, periodMonth?: unknown) => {
  const now = new Date();

  const year = toNumber(periodYear) || now.getFullYear();

  const month = String(toNumber(periodMonth) || now.getMonth() + 1).padStart(
    2,
    "0",
  );

  const timestamp = now.getTime().toString(36).toUpperCase();

  return `REC-${year}-${month}-${timestamp}`;
};

const normalizeAmount = (value: unknown) =>
  typeof value === "number" && Number.isFinite(value) ? value : 0;

const beforeValidateMonthlyReceipt: CollectionBeforeValidateHook = async ({
  data,
  operation,
  originalDoc,
  req,
}) => {
  if (!data) return data;

  if (!data.receiptNumber) {
    data.receiptNumber = formatReceiptNumber(data.periodYear, data.periodMonth);
  }

  if (data.lineItems && !Array.isArray(data.lineItems)) {
    data.lineItems = [];
  }

  const lineItemsTotal = Array.isArray(data.lineItems)
    ? data.lineItems.reduce(
        (total, item) =>
          total +
          (item?.type === "discount"
            ? -normalizeAmount(item?.amount)
            : normalizeAmount(item?.amount)),
        0,
      )
    : 0;

  if (!data.totalAmount) {
    data.totalAmount =
      normalizeAmount(data.baseRent) +
      normalizeAmount(data.administrationFee) +
      normalizeAmount(data.utilitiesAmount) +
      normalizeAmount(data.otherChargesAmount) -
      normalizeAmount(data.discountAmount) +
      normalizeAmount(data.lateFeeAmount) +
      lineItemsTotal;
  }

  const contractId = getRelationshipId(data.contract);
  const originalContractId = getRelationshipId(originalDoc?.contract);

  if (
    contractId &&
    (!Array.isArray(data.users) || data.users.length === 0)
  ) {
    const contract = await req.payload.findByID({
      collection: "contracts",
      id: contractId,
      depth: 0,
      overrideAccess: true,
      req,
    });

    const contractUsers = getRelationshipIds(contract.users);

    if (contractUsers.length > 0) {
      data.users = contractUsers;
    }
  }

  const periodMonth = toStringValue(data.periodMonth);
  const periodYear = toStringValue(data.periodYear);

  const originalPeriodMonth = toStringValue(originalDoc?.periodMonth);
  const originalPeriodYear = toStringValue(originalDoc?.periodYear);

  const hasContractChanged =
    String(originalContractId ?? "") !== String(contractId ?? "");

  const hasPeriodChanged =
    originalPeriodMonth !== periodMonth || originalPeriodYear !== periodYear;

  if (
    contractId &&
    periodMonth &&
    periodYear &&
    (operation === "create" || hasContractChanged || hasPeriodChanged)
  ) {
    const duplicateReceiptWhere: Where = {
      and: [
        {
          contract: {
            equals: contractId,
          },
        },
        {
          periodMonth: {
            equals: periodMonth,
          },
        },
        {
          periodYear: {
            equals: periodYear,
          },
        },
      ],
    };

    if (originalDoc?.id) {
      duplicateReceiptWhere.and?.push({
        id: {
          not_equals: originalDoc.id,
        },
      });
    }

    const existingReceipt = await req.payload.find({
      collection: "monthly-receipts",
      depth: 0,
      limit: 1,
      where: duplicateReceiptWhere,
      overrideAccess: true,
    });

    if (existingReceipt.totalDocs > 0) {
      throw new Error(
        "Ya existe un recibo mensual para este contrato, mes y año.",
      );
    }
  }

  return data;
};

const syncMonthlyReceiptDocumentUsers: CollectionAfterChangeHook = async ({
  doc,
  req,
}) => {
  const pdfDocumentId = getRelationshipId(doc.pdfDocument);

  if (!pdfDocumentId) {
    return doc;
  }

  const relatedUsers = getRelationshipIds(doc.users)
    .map((id) => Number(id))
    .filter((id) => Number.isFinite(id));
  const contractId = toNumber(getRelationshipId(doc.contract));

  if (relatedUsers.length === 0) {
    return doc;
  }

  await req.payload.update({
    collection: "documents",
    id: pdfDocumentId,
    data: {
      documentType: "payment_receipt",
      users: relatedUsers,
      contract: contractId ?? null,
      month: String(doc.periodMonth),
      year: Number(doc.periodYear),
    },
    overrideAccess: true,
    req,
  });

  return doc;
};

const afterChangeMonthlyReceipt: CollectionAfterChangeHook = async (args) => {
  const { doc, operation, req } = args;

  await syncMonthlyReceiptDocumentUsers(args);

  if (req.context?.skipMonthlyReceiptAutoEmail) {
    return doc;
  }

  if (operation === "create") {
    await ensureMonthlyReceiptPDF({
      payload: req.payload,
      receiptId: doc.id,
      generatedBy: req.user?.id,
      req,
    });
  }

  const currentStatus = doc.status || "draft";

  if (
    currentStatus !== "draft" &&
    !doc.sentAt &&
    req.user
  ) {
    await issueMonthlyReceipt({
      payload: req.payload,
      receiptId: doc.id,
      generatedBy: req.user.id,
      req,
    });
  }

  return doc;
};

export const MonthlyReceipts: CollectionConfig = {
  slug: "monthly-receipts",

  labels: {
    singular: "Recibo mensual",
    plural: "Recibos mensuales",
  },

  admin: {
    useAsTitle: "receiptNumber",
    defaultColumns: [
      "receiptNumber",
      "users",
      "contract",
      "periodMonth",
      "periodYear",
      "totalAmount",
      "status",
      "dueDate",
    ],
  },

  access: {
    read: ({ req }) => {
      const user = req.user;

      if (!user) return false;
      if (user.role === "admin") return true;

      const monthlyReceiptAccessWhere: Where = {
        users: {
          equals: user.id,
        },
      };

      return monthlyReceiptAccessWhere;
    },

    create: ({ req }) => req.user?.role === "admin",
    update: ({ req }) => req.user?.role === "admin",
    delete: ({ req }) => req.user?.role === "admin",
  },

  hooks: {
    beforeValidate: [beforeValidateMonthlyReceipt],
    afterChange: [afterChangeMonthlyReceipt],
  },

  fields: [
    {
      name: "receiptNumber",
      label: "Número de recibo",
      type: "text",
      required: true,
      unique: true,
      admin: {
        description: "Se genera automáticamente si se deja vacío.",
      },
    },

    {
      name: "contract",
      label: "Contrato",
      type: "relationship",
      relationTo: "contracts",
      required: true,
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
      admin: {
        description:
          "Puedes asociar este recibo a un usuario o a varios usuarios.",
      },
    },

    {
      type: "row",
      fields: [
        {
          name: "periodMonth",
          label: "Mes",
          type: "select",
          required: true,
          defaultValue: String(new Date().getMonth() + 1),
          options: MONTH_OPTIONS,
          admin: {
            placeholder: "Selecciona el mes",
          },
        },
        {
          name: "periodYear",
          label: "Año",
          type: "select",
          required: true,
          defaultValue: String(new Date().getFullYear()),
          options: getYearOptions(),
          admin: {
            placeholder: "Selecciona el año",
          },
        },
      ],
    },

    {
      type: "row",
      fields: [
        {
          name: "periodStartDate",
          label: "Inicio del período",
          type: "date",
          required: true,
        },
        {
          name: "periodEndDate",
          label: "Fin del período",
          type: "date",
          required: true,
        },
      ],
    },

    {
      type: "row",
      fields: [
        {
          name: "issueDate",
          label: "Fecha de emisión",
          type: "date",
          required: true,
        },
        {
          name: "dueDate",
          label: "Fecha límite de pago",
          type: "date",
          required: true,
        },
      ],
    },

    {
      type: "row",
      fields: [
        {
          name: "baseRent",
          label: "Canon base",
          type: "number",
          required: true,
          min: 0,
        },
        {
          name: "administrationFee",
          label: "Administración",
          type: "number",
          defaultValue: 0,
          min: 0,
        },
      ],
    },

    {
      type: "row",
      fields: [
        {
          name: "utilitiesAmount",
          label: "Servicios",
          type: "number",
          defaultValue: 0,
          min: 0,
        },
        {
          name: "otherChargesAmount",
          label: "Otros cobros",
          type: "number",
          defaultValue: 0,
        },
      ],
    },

    {
      type: "row",
      fields: [
        {
          name: "discountAmount",
          label: "Descuentos",
          type: "number",
          defaultValue: 0,
          min: 0,
        },
        {
          name: "lateFeeAmount",
          label: "Mora",
          type: "number",
          defaultValue: 0,
          min: 0,
        },
      ],
    },

    {
      name: "lineItems",
      label: "Detalle adicional",
      type: "array",
      fields: [
        {
          name: "label",
          label: "Concepto",
          type: "text",
          required: true,
        },
        {
          name: "type",
          label: "Tipo",
          type: "select",
          required: true,
          options: [
            { label: "Canon", value: "rent" },
            { label: "Administración", value: "administration" },
            { label: "Servicios", value: "utilities" },
            { label: "Otro cobro", value: "other_charge" },
            { label: "Descuento", value: "discount" },
            { label: "Mora", value: "late_fee" },
          ],
        },
        {
          name: "amount",
          label: "Valor",
          type: "number",
          required: true,
        },
      ],
    },

    {
      type: "row",
      fields: [
        {
          name: "totalAmount",
          label: "Total",
          type: "number",
          required: true,
          min: 0,
        },
        {
          name: "currency",
          label: "Moneda",
          type: "text",
          defaultValue: "COP",
          required: true,
        },
      ],
    },

    {
      name: "status",
      label: "Estado",
      type: "select",
      required: true,
      defaultValue: "draft",
      options: [
        { label: "Borrador", value: "draft" },
        { label: "Emitido", value: "issued" },
        { label: "Enviado", value: "sent" },
        { label: "Pagado", value: "paid" },
        { label: "Vencido", value: "overdue" },
        { label: "Anulado", value: "cancelled" },
      ],
    },

    {
      type: "row",
      fields: [
        {
          name: "paymentDate",
          label: "Fecha de pago",
          type: "date",
        },
        {
          name: "paymentMethod",
          label: "Método de pago",
          type: "text",
        },
      ],
    },

    {
      name: "paymentReference",
      label: "Referencia de pago",
      type: "text",
    },

    {
      name: "pdfDocument",
      label: "PDF del recibo",
      type: "relationship",
      relationTo: "documents",
      admin: {
        hidden: true,
        description:
          "Documento PDF generado para que los usuarios relacionados lo vean o descarguen.",
      },
    },

    {
      type: "row",
      fields: [
        {
          name: "sentAt",
          label: "Fecha de envío",
          type: "date",
        },
        {
          name: "generatedBy",
          label: "Generado por",
          type: "relationship",
          relationTo: "users",
        },
      ],
    },

    {
      type: "row",
      fields: [
        {
          name: "emailMessageId",
          label: "ID del correo",
          type: "text",
          admin: {
            readOnly: true,
            description:
              "Identificador devuelto por el proveedor de correo al aceptar el envío.",
          },
        },
        {
          name: "emailLastError",
          label: "Último error de correo",
          type: "text",
          admin: {
            readOnly: true,
          },
        },
      ],
    },

    {
      name: "notes",
      label: "Observaciones",
      type: "textarea",
    },
  ],
};
