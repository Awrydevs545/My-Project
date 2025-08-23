import React from 'react';
import './Modal.css';

const Modal = ({ show, onClose, article }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{article.title}</h2>
                    <button onClick={onClose} className="close-button">&times;</button>
                </div>
                <div className="modal-body">
                    <img src={article.image} alt={article.title} />
                    <p>{article.fullText}</p>
                </div>
            </div>
        </div>
    );
};

export default Modal;