import React, { useState } from 'react';
import Modal from '../Components/Modal';
import './FootballBulletin.css';
import bg from "../assets/images/bulletin-bg.jpg";
import news1 from '../assets/images/news1.jpg';
import news2 from '../assets/images/news2.jpg';
import news3 from '../assets/images/news3.jpg';

const newsArticles = [
  { id: 1, title: 'FC Barcelona was crowned Copa del Rey champions for 2025 after beating Real Madrid 3–2 in a dramatic final played at Estadio de La Cartuja in Seville.', image: news1, excerpt: '...', fullText: '...' },
  { id: 2, title: 'Lamine Yamal receiving Barcelona’s legendary No. 10 jersey. It was presented to him by club president Joan Laporta during a special ceremony following the signing of his new contract that extends until 2031.', image: news2, excerpt: '...', fullText: '...' },
  { id: 3, title: 'Upcoming Manchester Derby Preview', image: news3, excerpt: '...', fullText: '...' },
];


const FootballBulletin = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);

    const handleReadMore = (article) => {
        setSelectedArticle(article);
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    return (
        <div
        className="bulletin-container"
        style={{ backgroundImage: `url(${bg})` }}
        >
            <h2>Football Bulletin</h2>
            <div className="news-grid">
                {newsArticles.map(article => (
                    <div key={article.id} className="news-card">
                        <img src={article.image} alt={article.title} className="news-image"/>
                        <div className="news-content">
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