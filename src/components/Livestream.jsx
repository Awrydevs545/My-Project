import React,{ useState } from 'react';
import styles from './Livestream.module.css';
import { streams } from './livestreamDatabase';

const Livestream = () => {
    const [currentStream, setCurrentStream] = useState(streams[0]);

    const handleStreamSelect = (stream) => {
        setCurrentStream(stream);
    };

    return (
        <div className={styles.livestreamSection}>
            <h2>Livestream Hub</h2>
            <div className={styles.hubLayout}>
                <div className={styles.playerContainer}>
                    <div className={styles.videoWrapper}>
                        <iframe
                            key={currentStream.id} // The key ensures a full re-render on stream change
                            width="100%"
                            height="100%"
                            // --- THE DEFINITIVE FIX IS HERE ---
                            // We are now using the full URL directly from our database.
                            // No more building the URL from an ID.
                            src={`${currentStream.url}?autoplay=1&mute=1`}
                            title={currentStream.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>
                    <div className={styles.videoInfo}>
                        <h3>{currentStream.title}</h3>
                        <p>{currentStream.description}</p>
                    </div>
                </div>
                <div className={styles.playlistContainer}>
                    <h4>Available Streams</h4>
                    <ul className={styles.streamList}>
                        {streams.map(stream => (
                            <li
                                key={stream.id}
                                className={`${styles.streamItem} ${currentStream.id === stream.id ? styles.active : ''}`}
                                onClick={() => handleStreamSelect(stream)}
                            >
                                <div className={styles.itemDetails}>
                                    <span className={styles.itemCategory}>{stream.category}</span>
                                    <span className={styles.itemTitle}>{stream.title}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Livestream;