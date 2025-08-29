import React from 'react';
import styles from './Footer.module.css';
import facebookIcon from '../assets/icon/facebook.svg';
import twitterIcon from '../assets/icon/twitter.svg';
import instagramIcon from '../assets/icon/instagram.svg';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.socialMedia}>
        <a href="#" aria-label="Facebook">
          <img src={facebookIcon} alt="Facebook" className={styles.socialIcon} />
        </a>
        <a href="#" aria-label="Twitter">
          <img src={twitterIcon} alt="Twitter" className={styles.socialIcon} />
        </a>
        <a href="#" aria-label="Instagram">
          <img src={instagramIcon} alt="Instagram" className={styles.socialIcon} />
        </a>
      </div>
      <p>&copy; {new Date().getFullYear()} THE FOOTBALL INDEX. All Rights Reserved.</p>
    </footer>
  );
};
export default Footer;