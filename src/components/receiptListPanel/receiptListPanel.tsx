"use client";

import styles from "./receiptListPanel.module.css";
import { formatCOP, formatDate } from "@/lib/monthlyReceipts/formatters";

export type ReceiptListItem = {
  id: string | number;
  title: string;
  propertyTitle?: string | null;
  dueDate?: string | null;
  totalAmount?: number | null;
  status: string;
  documentId?: string | number | null;
};

type ReceiptListPanelProps = {
  items?: ReceiptListItem[];
  title?: string;
};

const STATUS_LABELS: Record<string, string> = {
  draft: "Borrador",
  issued: "Emitido",
  sent: "Enviado",
  paid: "Pagado",
  overdue: "Vencido",
  cancelled: "Anulado",
};

export function ReceiptListPanel({
  items = [],
  title = "Recibos",
}: ReceiptListPanelProps) {
  const handleView = async (documentId: string | number) => {
    const res = await fetch(`/api/document-url?id=${documentId}`);
    const data = await res.json();

    if (data.url) {
      window.open(data.url, "_blank");
    }
  };

  const handleDownload = async (documentId: string | number) => {
    const res = await fetch(`/api/document-url?id=${documentId}`);
    const data = await res.json();

    if (data.url) {
      const link = document.createElement("a");
      link.href = data.url;
      link.download = "";
      link.click();
    }
  };

  return (
    <div className={styles.panel}>
      <section className={styles.heading}>
        <h2 className={styles.title}>{title}</h2>
      </section>

      {items.length === 0 ? (
        <p>Aún no tienes recibos.</p>
      ) : (
        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item.id} className={styles.item}>
              <div className={styles.main}>
                <div className={styles.icon}>
                  <i className="icon-FilePdf" />
                </div>

                <div className={styles.content}>
                  <div className={styles.titleRow}>
                    <span className={styles.receiptTitle}>{item.title}</span>
                    <span
                      className={`${styles.status} ${styles[item.status] || ""}`}
                    >
                      {STATUS_LABELS[item.status] || item.status}
                    </span>
                  </div>

                  <div className={styles.metaRow}>
                    {item.propertyTitle && <span>{item.propertyTitle}</span>}
                    <span>Vence: {formatDate(item.dueDate)}</span>
                    <strong>{formatCOP(item.totalAmount)}</strong>
                  </div>
                </div>
              </div>

              <div className={styles.actions}>
                <button
                  type="button"
                  disabled={!item.documentId}
                  onClick={() => item.documentId && handleView(item.documentId)}
                  className={styles.viewButton}
                >
                  <i className="icon-eye" />
                  Ver
                </button>

                <button
                  type="button"
                  disabled={!item.documentId}
                  onClick={() =>
                    item.documentId && handleDownload(item.documentId)
                  }
                  className={styles.downloadButton}
                >
                  <i className="icon-DownloadSimple" />
                  Descargar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
