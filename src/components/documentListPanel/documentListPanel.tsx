import Link from 'next/link';
import styles from './documentListPanel.module.css';
import { bytesToMBFormatted } from '@/helpers/helpers';

type DocumentListPanelProps<T> = {
    items?: T[];
    title?: string;
    getId: (item: T) => string | number;
    getTitle: (item: T) => string;
    getSize?: (item: T) => number | null | undefined;
    getUrl?: (item: T) => string | null | undefined;
    getDocumentType?: (item: T) => string | null | undefined;
};

export function DocumentListPanel<T>({
    items = [],
    title,
    getId,
    getTitle,
    getSize,
    getUrl,
}: DocumentListPanelProps<T>) {
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
                        const id = getId(item);
                        const itemTitle = getTitle(item);
                        const size = bytesToMBFormatted(getSize?.(item));
                        const url = getUrl?.(item);

                        console.log("URL del documento:", url);

                        return (
                            <li key={id} className={styles.li}>
                                <div className={styles["li-left"]}>
                                    <div className={styles.icon}>
                                        <i className="icon-FilePdf" />
                                    </div>

                                    <div className={styles.content}>
                                        <span className={styles.docTitle}>{itemTitle}</span>

                                        {size !== undefined && (
                                            <div className={styles.metaRow}>
                                                <span className={styles.meta}>{size}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {url && (
                                    <div className={styles.actions}>
                                        <Link
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.viewLink}
                                        >
                                            <i className="icon-eye" />
                                            VER
                                        </Link>

                                        <Link
                                            href={url}
                                            download
                                            className={styles.downloadLink}
                                        >
                                            <i className="icon-DownloadSimple" />
                                            BAJAR
                                        </Link>
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