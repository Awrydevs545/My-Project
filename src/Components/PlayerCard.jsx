import React, { useState, useRef, useMemo, memo } from 'react';
import styles from './PlayerCard.module.css';
import { useClickOutside } from '../components/useClickOutside';

// The StatBar component is the key to our visual design.
const StatBar = memo(({ value, maxValue, label }) => {
    const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;
    return (
        <div className={styles.statBarContainer}>
            <div className={styles.statLabel}>
                <span>{label}</span>
                <span>{value}</span>
            </div>
            <div className={styles.barBackground}>
                <div className={styles.barForeground} style={{ width: `${percentage}%` }}></div>
            </div>
        </div>
    );
});

const PlayerCard = ({ player, stats, opponentStats, allPlayers, onPlayerChange }) => {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const searchContainerRef = useRef(null);
    useClickOutside(searchContainerRef, () => setIsFocused(false));

    const suggestions = useMemo(() => {
        if (!query || !allPlayers) return [];
        return Object.values(allPlayers)
            .filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
            .slice(0, 5);
    }, [query, allPlayers]);

    const handleSelectPlayer = (selectedPlayer) => {
        const fullPlayerObject = allPlayers[selectedPlayer.id];
        onPlayerChange(fullPlayerObject);
        setQuery('');
        setIsFocused(false);
    };

    // This logic finds all the available stat keys (e.g., "Goals", "Tackles Won")
    const statKeys = stats ? Object.keys(stats).filter(key => key !== 'gamesPlayed') : [];

    return (
        <div className={styles.playerCard}>
            <div className={styles.searchWrapper} ref={searchContainerRef}>
                <input
                    type="text"
                    className={styles.searchInput}
                    placeholder="Search player..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                />
                {isFocused && query && (
                    <ul className={styles.suggestionsList}>
                        {suggestions.length > 0 ? (
                            suggestions.map(p => <li key={p.id} onClick={() => handleSelectPlayer(p)}>{p.name}</li>)
                        ) : (
                            <li className={styles.loadingItem}>No players found.</li>
                        )}
                    </ul>
                )}
            </div>

            <img src={player.image} alt={player.name} className={styles.playerImage} loading="lazy" />
            <h3 className={styles.playerName}>{player.name}</h3>

            <div className={styles.playerDetails}>
                <div className={styles.detailItem}><span>Position</span><strong>{player.position}</strong></div>
                <div className={styles.detailItem}><span>Club</span><strong>{player.club}</strong></div>
                <div className={styles.detailItem}><span>Nationality</span><strong>{player.nationality}</strong></div>
                <div className={styles.detailItem}><span>Games Played</span><strong>{stats.gamesPlayed}</strong></div>
            </div>

            {/* --- THE DYNAMIC STAT RENDERING IS BACK --- */}
            {/* This maps over the stats and creates a StatBar for each one */}
            <div className={styles.statsVisual}>
                {statKeys.map(key => {
                    const value = stats[key];
                    const opponentValue = opponentStats ? opponentStats[key] || 0 : 0;
                    const maxValue = key.toLowerCase().includes('pct') || key.toLowerCase().includes('accuracy')
                        ? 100
                        : Math.max(1, value, opponentValue);
                    
                    return (
                        <StatBar
                            key={key}
                            label={key}
                            value={value}
                            maxValue={maxValue}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default memo(PlayerCard);