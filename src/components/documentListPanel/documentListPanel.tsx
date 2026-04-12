'use client';

import Link from 'next/link';
import styles from './documentListPanel.module.css';
import type { Document } from '@/payload-types';

type DocumentListPanelProps = {
    documents?: Document[];
    title?: string;
};

function formatFileSize(bytes?: number | null) {
    if (!bytes || bytes <= 0) return '0 B';

    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
    }

    return `${size.toFixed(unitIndex === 0 ? 0 : 2)} ${units[unitIndex]}`;
}

export const DocumentListPanel = ({
    documents = [],
    title,
}: DocumentListPanelProps) => {
    return (
        <div className={styles["document-list-panel"]}>
            <section className={styles.heading}>
                <h2 className={styles.title}>{title || "Documentos"}</h2>
            </section>

            {documents.length === 0 ? (
                <p>Aún no tienes documentos.</p>
            ) : (
                <ul className={styles.list}>
                    {documents.map((doc) => (
                        <li key={doc.id} className={styles.li}>
                            <div className={styles["li-left"]}>
                                <div className={styles.icon}>
                                    <i className="icon-FilePdf" />
                                </div>

                                <div className={styles.content}>
                                    <span className={styles.docTitle}>{doc.title}</span>
                                    <div className={styles.metaRow}>
                                        <span className={styles.meta}>
                                            {formatFileSize(doc.filesize)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {doc.url && (
                                <div className={styles.actions}>
                                    <Link
                                        href={doc.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.viewLink}
                                    >
                                        <i className="icon-eye" />
                                        VER
                                    </Link>

                                    <Link
                                        href={doc.url}
                                        download
                                        className={styles.downloadLink}
                                    >
                                        <i className="icon-DownloadSimple" />
                                        BAJAR
                                    </Link>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};