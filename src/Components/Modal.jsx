import React from 'react';
import styles from './Modal.module.css';

const Modal = ({ show, onClose, article }) => {
    if (!show || !article) {
        return null;
    }

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h2>{article.title}</h2>
                    <button onClick={onClose} className={styles.closeButton}>&times;</button>
                </div>
                <div className={styles.modalBody}>
                    <img src={article.image} alt={article.title} />
                    <p>{article.fullText}</p>
                </div>
            </div>
        </div>
    );
};

export default Modal;