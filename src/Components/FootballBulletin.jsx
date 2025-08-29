import React, { useState } from 'react';
import Modal from '../components/Modal';
import { newsArticles } from './newsDatabase'; // It will now import the larger list
import styles from './FootballBulletin.module.css';

const FootballBulletin = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);

    const handleReadMore = (article) => {
        setSelectedArticle(article);
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    return (
        // The container no longer needs a background image
        <div className={styles.bulletinContainer}>
            {/* A slightly better title */}
            <h2>Latest News & Bulletins</h2>
            <div className={styles.newsGrid}>
                {newsArticles.map(article => (
                    <div key={article.id} className={styles.newsCard}>
                        <img src={article.image} alt={article.title} className={styles.newsImage} loading="lazy" />
                        <div className={styles.newsContent}>
                            <h3>{article.title}</h3>
                            <p>{article.excerpt}</p>
                            <button onClick={() => handleReadMore(article)}>Read More</button>
                        </div>
                    </div>
                ))}
            </div>
            <Modal show={showModal} onClose={handleCloseModal} article={selectedArticle} />
        </div>
    );
};

export default FootballBulletin;