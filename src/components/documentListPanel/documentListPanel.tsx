"use client";

import styles from "./documentListPanel.module.css";
import { bytesToMBFormatted } from "@/helpers/helpers";

export type DocumentListItem = {
  id: string | number;
  title: string;
  size?: number | null;
  hasFile?: boolean;
};

type DocumentListPanelProps = {
  items?: DocumentListItem[];
  title?: string;
};

export function DocumentListPanel({
  items = [],
  title,
}: DocumentListPanelProps) {
  const handleView = async (id: string | number) => {
    const res = await fetch(`/api/document-url?id=${id}`);
    const data = await res.json();

    if (data.url) {
      window.open(data.url, "_blank");
    }
  };

  const handleDownload = async (id: string | number) => {
    const res = await fetch(`/api/document-url?id=${id}`);
    const data = await res.json();

    if (data.url) {
      const link = document.createElement("a");
      link.href = data.url;
      link.download = "";
      link.click();
    }
  };

  return (
    <div className={styles["document-list-panel"]}>
      <section className={styles.heading}>
        <h2 className={styles.title}>{title || "Documentos"}</h2>
      </section>

      {items.length === 0 ? (
        <p>Aún no tienes elementos.</p>
      ) : (
        <ul className={styles.list}>
          {items.map((item) => {
            const size = bytesToMBFormatted(item.size);

            return (
              <li key={item.id} className={styles.li}>
                <div className={styles["li-left"]}>
                  <div className={styles.icon}>
                    <i className="icon-FilePdf" />
                  </div>

                  <div className={styles.content}>
                    <span className={styles.docTitle}>{item.title}</span>

                    {size !== undefined && (
                      <div className={styles.metaRow}>
                        <span className={styles.meta}>{size}</span>
                      </div>
                    )}
                  </div>
                </div>

                {item.hasFile !== false && (
                  <div className={styles.actions}>
                    <button
                      type="button"
                      onClick={() => handleView(item.id)}
                      className={styles.viewLink}
                    >
                      <i className="icon-eye" />
                      VER
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDownload(item.id)}
                      className={styles.downloadLink}
                    >
                      <i className="icon-DownloadSimple" />
                      Descargar
                    </button>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
