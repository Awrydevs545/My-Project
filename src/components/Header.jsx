import React, { useState, useRef, useMemo } from 'react';
import ThemeToggler from './ThemeToggler';
import styles from './Header.module.css';
import { SearchIcon, MenuIcon } from '../components/Icons';
import Logo from '../components/Logo';
import { useClickOutside } from '../components/useClickOutside';
import LeagueFilter from '../components/LeagueFilter'; // Import the LeagueFilter here

const Header = ({
    refs,
    searchablePlayers,
    onPlayerSearch,
    selectedLeague,   // Receive league state from App
    onLeagueChange    // Receive league handler from App
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const searchContainerRef = useRef(null);

    useClickOutside(searchContainerRef, () => setIsFocused(false));

    const suggestions = useMemo(() => {
        if (!query || !searchablePlayers) return [];
        return Object.values(searchablePlayers)
            .filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
            .slice(0, 5);
    }, [query, searchablePlayers]);

    const handleSearchSelect = (player) => {
        const fullPlayerObject = searchablePlayers[player.id];
        onPlayerSearch(fullPlayerObject);
        refs.statsRef.current?.scrollIntoView({ behavior: 'smooth' });
        setQuery('');
        setIsFocused(false);
    };

    const handleNavClick = (sectionRef) => {
        sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false);
    };

    return (
        <header className={styles.header}>
            <Logo />

            {/* THE LEAGUE FILTER IS NOW HERE, in the center of the header on desktop */}
            <div className={styles.leagueFilterWrapper}>
                <LeagueFilter selected={selectedLeague} onChange={onLeagueChange} />
            </div>

            <nav className={styles.desktopNavbar}>
                <ul>
                    <li onClick={() => handleNavClick(refs.statsRef)}>Player Stats</li>
                    <li onClick={() => handleNavClick(refs.livestreamRef)}>Livestream</li>
                    <li onClick={() => handleNavClick(refs.bulletinRef)}>Bulletin</li>
                </ul>
            </nav>

            <nav className={`${styles.mobileNavbar} ${isMenuOpen ? styles.mobileNavOpen : ''}`}>
                {/* We can also add the league filter to the mobile menu for access */}
                <div className={styles.mobileLeagueFilter}>
                    <LeagueFilter selected={selectedLeague} onChange={onLeagueChange} />
                </div>
                <ul>
                    <li onClick={() => handleNavClick(refs.statsRef)}>Player Stats</li>
                    <li onClick={() => handleNavClick(refs.livestreamRef)}>Livestream</li>
                    <li onClick={() => handleNavClick(refs.bulletinRef)}>Bulletin</li>
                </ul>
            </nav>

            <div className={styles.headerControls}>
                <div className={styles.searchWrapper} ref={searchContainerRef}>
                    <form className={styles.searchContainer} onSubmit={(e) => e.preventDefault()}>
                        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} onFocus={() => setIsFocused(true)} className={styles.searchInput} placeholder="Search Player..." />
                        <button type="submit" className={styles.searchButton}><SearchIcon /></button>
                    </form>
                    {isFocused && query && (
                        <ul className={styles.suggestionsList}>
                            {suggestions.length > 0 ? (
                                suggestions.map(p => <li key={p.id} onClick={() => handleSearchSelect(p)}>{p.name}</li>)
                            ) : ( <li className={styles.suggestionItemDisabled}>No players found.</li> )}
                        </ul>
                    )}
                </div>
                <ThemeToggler />
                <button className={styles.menuButton} onClick={() => setIsMenuOpen(!isMenuOpen)}><MenuIcon /></button>
            </div>
        </header>
    );
};

export default Header;