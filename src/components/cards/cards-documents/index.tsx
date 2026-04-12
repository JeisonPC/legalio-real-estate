import React from 'react';
import styles from './styles.module.css';

interface CardDocumentsProps {
    title?: string;
    description?: string;
    children?: React.ReactNode;
}

const CardDocuments: React.FC<CardDocumentsProps> = ({
    title = 'Documents',
    description = 'Manage your documents here',
    children,
}) => {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <h2>{title}</h2>
            </div>

            <div className={styles.body}>
                {description && <p className={styles.description}>{description}</p>}
                {children}
            </div>
        </div>
    );
};

export default CardDocuments;