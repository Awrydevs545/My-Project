import React from 'react';
import './Footer.css';
// Assume you have these SVG icons in your assets folder
import FacebookIcon from '../assets/icon/facebook.svg';
import TwitterIcon from '../assets/icon/twitter.svg';
import InstagramIcon from '../assets/icon/instagram.svg';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="social-media">
                <a href="#"><img src={FacebookIcon} alt="Facebook"/></a>
                <a href="#"><img src={TwitterIcon} alt="Twitter"/></a>
                <a href="#"><img src={InstagramIcon} alt="Instagram"/></a>
            </div>
            <p>&copy; 2025 EA Sports FC. All Rights Reserved.</p>
        </footer>
    );
};

export default Footer;