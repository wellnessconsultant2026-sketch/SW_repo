'use client';

import React from 'react';
import styles from './ConfirmModal.module.css';

export default function ConfirmModal({
    isOpen,
    title = 'Confirm deletion',
    message,
    confirmLabel = 'Delete',
    onConfirm,
    onCancel
}) {
    if (!isOpen) return null;

    return (
        <div className={styles.backdrop} role="presentation" onClick={onCancel}>
            <div
                className={styles.dialog}
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="confirm-modal-title"
                onClick={event => event.stopPropagation()}
            >
                <h2 id="confirm-modal-title" className={styles.title}>{title}</h2>
                <p className={styles.message}>{message}</p>
                <div className={styles.actions}>
                    <button type="button" className={styles.cancelButton} onClick={onCancel}>
                        Cancel
                    </button>
                    <button type="button" className={styles.confirmButton} onClick={onConfirm}>
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}
