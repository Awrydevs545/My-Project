import React, { useContext } from 'react';
import { ThemeContext } from '../components/ThemeContext';
import styles from './ThemeToggler.module.css';

const ThemeToggler = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <button onClick={toggleTheme} className={styles.themeToggler} aria-label="Toggle theme">
            {theme === 'dark' ? '☀️' : '🌙'}
        </button>
    );
};

export default ThemeToggler;