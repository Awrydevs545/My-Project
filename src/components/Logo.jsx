import React from 'react';
import styles from './Logo.module.css';

const Logo = () => {
  return (
    <div className={styles.logo}>
      {/* "The" word */}
      <span className={styles.logoWordSecondary}>
        <span className={styles.firstLetter}>T</span>
        <span className={styles.restOfWord}>he</span>
      </span>

      {/* "Football" word */}
      <span className={styles.logoWordPrimary}>
        <span className={styles.firstLetter}>F</span>
        <span className={styles.restOfWord}>ootball</span>
      </span>

      {/* "Index" word */}
      <span className={styles.logoWordPrimary}>
        <span className={styles.firstLetter}>I</span>
        <span className={styles.restOfWord}>ndex</span>
      </span>
    </div>
  );
};

export default Logo;