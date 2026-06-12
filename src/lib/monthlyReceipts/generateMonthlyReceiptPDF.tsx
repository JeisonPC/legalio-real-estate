import {
  Document as PDFDocument,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
  renderToBuffer,
} from "@react-pdf/renderer";
import React from "react";
import type { Contract, MonthlyReceipt, Property, User } from "@/payload-types";
import {
  formatCOP,
  formatDate,
  formatReceiptPeriod,
} from "./formatters";
import { getUserDisplayName } from "@/helpers/helpers";

type ReceiptSettingsData = {
  companyName?: string | null;
  companyNit?: string | null;
  companyAddress?: string | null;
  companyEmail?: string | null;
  companyPhone?: string | null;
  paymentInstructions?: string | null;
  bankName?: string | null;
  bankAccountType?: string | null;
  bankAccountNumber?: string | null;
  bankAccountHolder?: string | null;
  footerText?: string | null;
};

type PopulatedMonthlyReceipt = MonthlyReceipt & {
  contract: Contract;
  property: Property;
  owner: User;
  tenant: User;
};

type ReceiptLineItem = {
  label: string;
  amount: number;
};

const LOGO_PATH = `${process.cwd()}/public/assets/images/logo/logo-2.png`;
const BLUE = "#051957";
const GRAY = "#F0F0F0";
const STRIPE = "#E6DEDE";
const TEXT = "#111827";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFFFFF",
    color: TEXT,
    fontFamily: "Helvetica",
    fontSize: 9,
    lineHeight: 1.35,
    paddingBottom: 28,
  },
  header: {
    height: 164,
    position: "relative",
  },
  brandBlock: {
    position: "absolute",
    left: 0,
    top: 0,
    width: 254,
    height: 141,
    alignItems: "center",
    backgroundColor: BLUE,
    borderBottomRightRadius: 22,
    justifyContent: "center",
  },
  logo: {
    width: 174,
    height: 41,
  },
  companyInfo: {
    position: "absolute",
    right: 32,
    top: 34,
    width: 220,
  },
  infoLine: {
    flexDirection: "row",
    gap: 4,
    marginBottom: 2,
  },
  icon: {
    color: BLUE,
    fontSize: 7,
    fontWeight: 700,
    width: 10,
  },
  strong: {
    fontWeight: 700,
  },
  content: {
    paddingHorizontal: 40,
  },
  panel: {
    backgroundColor: GRAY,
    marginBottom: 24,
  },
  panelHeader: {
    backgroundColor: BLUE,
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: 700,
    paddingHorizontal: 16,
    paddingVertical: 7,
  },
  panelBody: {
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  detailsGrid: {
    flexDirection: "row",
    gap: 22,
  },
  detailsColumn: {
    flex: 1,
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  detailLabel: {
    fontWeight: 700,
    minWidth: 106,
  },
  detailValue: {
    flex: 1,
  },
  table: {
    marginBottom: 24,
  },
  tableHeader: {
    backgroundColor: BLUE,
    color: "#FFFFFF",
    flexDirection: "row",
    fontSize: 10,
    fontWeight: 700,
    paddingVertical: 8,
  },
  tableRow: {
    flexDirection: "row",
    minHeight: 35,
    paddingVertical: 9,
  },
  tableRowEven: {
    backgroundColor: GRAY,
  },
  tableRowOdd: {
    backgroundColor: STRIPE,
  },
  descriptionColumn: {
    flex: 1.5,
    paddingHorizontal: 14,
  },
  quantityColumn: {
    flex: 0.65,
    paddingHorizontal: 8,
    textAlign: "center",
  },
  moneyColumn: {
    flex: 0.85,
    paddingHorizontal: 8,
    textAlign: "right",
  },
  ivaColumn: {
    flex: 0.5,
    paddingHorizontal: 8,
    textAlign: "center",
  },
  totalSummary: {
    alignItems: "flex-end",
    backgroundColor: GRAY,
    borderTopWidth: 1,
    borderTopColor: "#FFFFFF",
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  totalLabel: {
    color: BLUE,
    fontSize: 10,
    fontWeight: 700,
  },
  totalValue: {
    color: BLUE,
    fontSize: 16,
    fontWeight: 700,
    marginTop: 2,
  },
  footerRule: {
    borderTopWidth: 2,
    borderTopColor: BLUE,
    marginBottom: 18,
    marginTop: 4,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerLinks: {
    width: 230,
  },
  footerLine: {
    color: TEXT,
    fontSize: 9,
    lineHeight: 1.45,
  },
});

const getLineItems = (receipt: PopulatedMonthlyReceipt): ReceiptLineItem[] => {
  const items = [
    { label: "Canon de arrendamiento", amount: receipt.baseRent },
    { label: "Administracion", amount: receipt.administrationFee || 0 },
    { label: "Servicios", amount: receipt.utilitiesAmount || 0 },
    { label: "Otros cobros", amount: receipt.otherChargesAmount || 0 },
    { label: "Descuentos", amount: -(receipt.discountAmount || 0) },
    { label: "Mora", amount: receipt.lateFeeAmount || 0 },
    ...(receipt.lineItems || []).map((item) => ({
      label: item.label,
      amount: item.type === "discount" ? -item.amount : item.amount,
    })),
  ];

  return items.filter((item) => item.amount !== 0);
};

const formatDateTime = (value: string | Date | null | undefined) => {
  if (!value) return "Sin fecha";

  return new Intl.DateTimeFormat("es-CO", {
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
};

const getUserName = (user: User) => getUserDisplayName(user);

const getUserDocument = (user: User) => {
  switch (user.indentificationType) {
    case "CC":
      return `Cédula de ciudadanía: ${user.identificationNumber}`;
    case "CE":
      return `Cédula de extranjería: ${user.identificationNumber}`;
    case "P":
      return `Pasaporte: ${user.identificationNumber}`;
    default:
      return user.email || "No registra";
  }
};

const getPaymentMethod = (settings: ReceiptSettingsData) =>
  settings.bankName ? `Transferencia bancaria - ${settings.bankName}` : "Transferencia bancaria";

function InfoLine({
  icon,
  label,
  value,
}: {
  icon?: string;
  label: string;
  value?: string | null;
}) {
  if (!value) return null;

  return (
    <View style={styles.infoLine}>
      <Text style={styles.icon}>{icon}</Text>
      <Text>
        <Text style={styles.strong}>{label}: </Text>
        {value}
      </Text>
    </View>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}:</Text>
      <Text style={styles.detailValue}>{value || "No registra"}</Text>
    </View>
  );
}

function MonthlyReceiptPDF({
  receipt,
  settings,
}: {
  receipt: PopulatedMonthlyReceipt;
  settings: ReceiptSettingsData;
}) {
  const companyName = settings.companyName || "Legalio S.A.S.";
  const companyEmail = settings.companyEmail || "contacto@legalio.com.co";
  const companyPhone = settings.companyPhone || "304 603 5418";
  const companyAddress =
    settings.companyAddress || "Calle 3 # 28-131, Palmira, Valle del Cauca";
  const companyNit = settings.companyNit || "1113682359-5";
  const lineItems = getLineItems(receipt);
  const rows: Array<ReceiptLineItem | null> = [
    ...lineItems,
    ...Array.from<null>({ length: Math.max(0, 4 - lineItems.length) }).fill(
      null,
    ),
  ];
  const bankSummary = [
    settings.bankName,
    settings.bankAccountType,
    settings.bankAccountNumber,
  ].filter(Boolean).join(" - ");
  const footerText = [
    "legalio.com.co",
    companyPhone,
    companyEmail,
  ].join("\n");

  return (
    <PDFDocument
      author={companyName}
      subject="Recibo mensual de arrendamiento"
      title={`Recibo ${receipt.receiptNumber}`}
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.brandBlock}>
            <Image src={LOGO_PATH} style={styles.logo} />
          </View>

          <View style={styles.companyInfo}>
            <InfoLine label="Nombre" value={companyName} />
            <InfoLine label="NIT" value={companyNit} />
            <InfoLine label="Dirección" value={companyAddress} />
            <InfoLine label="Correo" value={companyEmail} />
            <InfoLine label="Teléfono" value={companyPhone} />
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.panel}>
            <Text style={styles.panelHeader}>Cliente:</Text>
            <View style={styles.panelBody}>
              <InfoLine label="Nombre" value={getUserName(receipt.tenant)} />
              <InfoLine
                label="Documento"
                value={getUserDocument(receipt.tenant)}
              />
              <InfoLine label="Direccion" value={receipt.property.address} />
              <InfoLine label="Correo" value={receipt.tenant.email} />
            </View>
          </View>

          <View style={styles.panel}>
            <Text style={styles.panelHeader}>Datos de la factura:</Text>
            <View style={[styles.panelBody, styles.detailsGrid]}>
              <View style={styles.detailsColumn}>
                <DetailRow
                  label="Tipo de documento"
                  value="Recibo mensual de arrendamiento"
                />
                <DetailRow label="Numero de factura" value={receipt.receiptNumber} />
                <DetailRow
                  label="Fecha y hora de emision"
                  value={formatDateTime(receipt.issueDate)}
                />
                <DetailRow label="Medio de pago" value={getPaymentMethod(settings)} />
              </View>
              <View style={styles.detailsColumn}>
                <DetailRow
                  label="Periodo"
                  value={formatReceiptPeriod(receipt.periodMonth, receipt.periodYear)}
                />
                <DetailRow label="Fecha limite" value={formatDate(receipt.dueDate)} />
                <DetailRow label="Contrato" value={receipt.contract.contractCode} />
                <DetailRow label="Inmueble" value={receipt.property.title} />
                {bankSummary && <DetailRow label="Cuenta" value={bankSummary} />}
              </View>
            </View>
          </View>

          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.descriptionColumn}>Descripcion</Text>
              <Text style={styles.quantityColumn}>Cantidad</Text>
              <Text style={styles.moneyColumn}>Valor unitario</Text>
              <Text style={styles.ivaColumn}>IVA</Text>
              <Text style={styles.moneyColumn}>Total</Text>
            </View>

            {rows.map((item, index) => {
              const hasItem = item !== null;
              const amount = item?.amount || 0;

              return (
                <View
                  key={item?.label || `empty-${index}`}
                  style={[
                    styles.tableRow,
                    index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd,
                  ]}
                >
                  <Text style={styles.descriptionColumn}>{item?.label || " "}</Text>
                  <Text style={styles.quantityColumn}>{hasItem ? "1" : " "}</Text>
                  <Text style={styles.moneyColumn}>
                    {hasItem ? formatCOP(amount) : " "}
                  </Text>
                  <Text style={styles.ivaColumn}>{hasItem ? "0%" : " "}</Text>
                  <Text style={styles.moneyColumn}>
                    {hasItem ? formatCOP(amount) : " "}
                  </Text>
                </View>
              );
            })}

            <View style={styles.totalSummary}>
              <Text style={styles.totalLabel}>Total a pagar</Text>
              <Text style={styles.totalValue}>{formatCOP(receipt.totalAmount)}</Text>
            </View>
          </View>

          <View style={styles.footerRule} />
          <View style={styles.footer}>
            <View style={styles.footerLinks}>
              <Text style={styles.footerLine}>{footerText}</Text>
            </View>
          </View>
        </View>
      </Page>
    </PDFDocument>
  );
}

export async function generateMonthlyReceiptPDF({
  receipt,
  settings,
}: {
  receipt: PopulatedMonthlyReceipt;
  settings: ReceiptSettingsData;
}) {
  return renderToBuffer(
    <MonthlyReceiptPDF receipt={receipt} settings={settings} />,
  );
}
