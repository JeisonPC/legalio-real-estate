import {
  Document as PDFDocument,
  Page,
  StyleSheet,
  Text,
  View,
  renderToBuffer,
} from "@react-pdf/renderer";
import type { Contract, MonthlyReceipt, Property, User } from "@/payload-types";
import {
  formatCOP,
  formatDate,
  formatReceiptPeriod,
} from "./formatters";

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

const styles = StyleSheet.create({
  page: {
    padding: 40,
    color: "#162033",
    fontFamily: "Helvetica",
    fontSize: 10,
    lineHeight: 1.45,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: "#D8DEE8",
    paddingBottom: 18,
    marginBottom: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 24,
  },
  brand: {
    fontSize: 24,
    color: "#031756",
    fontWeight: 700,
  },
  muted: {
    color: "#667085",
  },
  title: {
    color: "#031756",
    fontSize: 18,
    fontWeight: 700,
    textAlign: "right",
  },
  receiptNumber: {
    marginTop: 6,
    color: "#344054",
    textAlign: "right",
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    color: "#031756",
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 8,
    textTransform: "uppercase",
  },
  grid: {
    flexDirection: "row",
    gap: 14,
  },
  column: {
    flex: 1,
  },
  infoBox: {
    borderWidth: 1,
    borderColor: "#E4E7EC",
    padding: 12,
    borderRadius: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    marginBottom: 5,
  },
  label: {
    color: "#667085",
  },
  value: {
    color: "#101828",
    fontWeight: 700,
    textAlign: "right",
  },
  table: {
    borderWidth: 1,
    borderColor: "#D8DEE8",
    borderRadius: 4,
    overflow: "hidden",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#031756",
    color: "#FFFFFF",
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontWeight: 700,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: "#EAECF0",
  },
  conceptColumn: {
    flex: 1,
  },
  amountColumn: {
    width: 130,
    textAlign: "right",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F2F4F7",
    padding: 12,
    marginTop: 0,
  },
  totalLabel: {
    color: "#031756",
    fontSize: 12,
    fontWeight: 700,
  },
  totalValue: {
    color: "#031756",
    fontSize: 16,
    fontWeight: 700,
  },
  footer: {
    position: "absolute",
    left: 40,
    right: 40,
    bottom: 28,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#E4E7EC",
    color: "#667085",
    fontSize: 8,
  },
});

const compact = (values: Array<string | null | undefined>) =>
  values.filter(Boolean).join(" | ");

const getLineItems = (receipt: PopulatedMonthlyReceipt) => {
  const items = [
    { label: "Canon de arrendamiento", amount: receipt.baseRent },
    { label: "Administración", amount: receipt.administrationFee || 0 },
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

function MonthlyReceiptPDF({
  receipt,
  settings,
}: {
  receipt: PopulatedMonthlyReceipt;
  settings: ReceiptSettingsData;
}) {
  const companyContact = compact([
    settings.companyNit ? `NIT ${settings.companyNit}` : null,
    settings.companyAddress,
    settings.companyEmail,
    settings.companyPhone,
  ]);

  const paymentDetails = [
    ["Banco", settings.bankName],
    ["Tipo de cuenta", settings.bankAccountType],
    ["Número de cuenta", settings.bankAccountNumber],
    ["Titular", settings.bankAccountHolder],
    ["Referencia", receipt.receiptNumber],
  ].filter(([, value]) => Boolean(value));

  return (
    <PDFDocument
      author={settings.companyName || "Legalio"}
      subject="Recibo mensual de arrendamiento"
      title={`Recibo ${receipt.receiptNumber}`}
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.brand}>{settings.companyName || "Legalio"}</Text>
            {companyContact && <Text style={styles.muted}>{companyContact}</Text>}
          </View>

          <View>
            <Text style={styles.title}>Recibo mensual de arrendamiento</Text>
            <Text style={styles.receiptNumber}>{receipt.receiptNumber}</Text>
          </View>
        </View>

        <View style={[styles.section, styles.grid]}>
          <View style={[styles.infoBox, styles.column]}>
            <Text style={styles.sectionTitle}>Recibo</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Periodo</Text>
              <Text style={styles.value}>
                {formatReceiptPeriod(receipt.periodMonth, receipt.periodYear)}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Emisión</Text>
              <Text style={styles.value}>{formatDate(receipt.issueDate)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Fecha límite</Text>
              <Text style={styles.value}>{formatDate(receipt.dueDate)}</Text>
            </View>
          </View>

          <View style={[styles.infoBox, styles.column]}>
            <Text style={styles.sectionTitle}>Contrato e inmueble</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Contrato</Text>
              <Text style={styles.value}>{receipt.contract.contractCode}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Inmueble</Text>
              <Text style={styles.value}>{receipt.property.title}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Dirección</Text>
              <Text style={styles.value}>{receipt.property.address}</Text>
            </View>
          </View>
        </View>

        <View style={[styles.section, styles.grid]}>
          <View style={[styles.infoBox, styles.column]}>
            <Text style={styles.sectionTitle}>Arrendatario</Text>
            <Text>{receipt.tenant.fullName || receipt.tenant.email}</Text>
            <Text style={styles.muted}>{receipt.tenant.email}</Text>
          </View>
          <View style={[styles.infoBox, styles.column]}>
            <Text style={styles.sectionTitle}>Propietario</Text>
            <Text>{receipt.owner.fullName || receipt.owner.email}</Text>
            <Text style={styles.muted}>{receipt.owner.email}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detalle del cobro</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.conceptColumn}>Concepto</Text>
              <Text style={styles.amountColumn}>Valor</Text>
            </View>

            {getLineItems(receipt).map((item) => (
              <View style={styles.tableRow} key={item.label}>
                <Text style={styles.conceptColumn}>{item.label}</Text>
                <Text style={styles.amountColumn}>{formatCOP(item.amount)}</Text>
              </View>
            ))}

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total a pagar</Text>
              <Text style={styles.totalValue}>
                {formatCOP(receipt.totalAmount)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Instrucciones de pago</Text>
          <View style={styles.infoBox}>
            {settings.paymentInstructions && (
              <Text>{settings.paymentInstructions}</Text>
            )}
            {paymentDetails.map(([label, value]) => (
              <View style={styles.row} key={label}>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.value}>{value}</Text>
              </View>
            ))}
          </View>
        </View>

        {receipt.notes && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Observaciones</Text>
            <Text>{receipt.notes}</Text>
          </View>
        )}

        <Text style={styles.footer}>
          {settings.footerText ||
            "Este documento fue generado automáticamente por Legalio."}
        </Text>
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
