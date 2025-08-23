import React from 'react';
import './Header.css';

// The 'refs' prop contains references to the DOM elements of each section
const Header = ({ refs }) => {
    // Function to handle the smooth scroll
    const handleNavClick = (sectionRef) => {
        sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <header className="header">
            <div className="logo">
                <h1>EA Sports FC</h1>
            </div>
            <nav className="navbar">
                <ul>
                    {/* Each list item scrolls to the corresponding section on click */}
                    <li onClick={() => handleNavClick(refs.statsRef)}>Player Stats</li>
                    <li onClick={() => handleNavClick(refs.livestreamRef)}>Livestream</li>
                    <li onClick={() => handleNavClick(refs.bulletinRef)}>Bulletin</li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;