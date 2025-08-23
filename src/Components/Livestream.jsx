import React, { useRef } from 'react';
import './Livestream.css';

const Livestream = () => {
    const videoContainerRef = useRef(null);

    // Function to request fullscreen for the video container
    const handleFullscreen = () => {
        if (videoContainerRef.current) {
            if (videoContainer-containerRef.current.requestFullscreen) {
                videoContainerRef.current.requestFullscreen();
            } else if (videoContainerRef.current.mozRequestFullScreen) { /* Firefox */
                videoContainerRef.current.mozRequestFullScreen();
            } else if (videoContainerRef.current.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
                videoContainerRef.current.webkitRequestFullscreen();
            } else if (videoContainerRef.current.msRequestFullscreen) { /* IE/Edge */
                videoContainerRef.current.msRequestFullscreen();
            }
        }
    };

    return (
        <div className="livestream-container" style={{backgroundImage: `url('/assets/images/livestream-bg.jpg')`}}>
            <h2>Live Match: Team A vs Team B</h2>
            <div className="stream-wrapper">
                <div ref={videoContainerRef} className="video-container">
                    <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/oYHdKBfTwbE"
                        title="Livestream"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen>
                    </iframe>
                </div>
                <div className="chat-placeholder">
                    <h4>Live Chat</h4>
                    <ul>
                        <li><strong>User1:</strong> Go Barcelona !</li>
                        <li><strong>User2:</strong> What a save!</li>
                        <li><strong>User3:</strong> This is an amazing match.</li>
                    </ul>
                </div>
            </div>
            <button onClick={handleFullscreen} className="fullscreen-btn">Go Fullscreen</button>
        </div>
    );
};

export default Livestream;