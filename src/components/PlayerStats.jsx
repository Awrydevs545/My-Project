import React, { useState, useCallback } from 'react';
import PlayerCard from './PlayerCard';
import FilterBar from './FilterBar';
import styles from './PlayerStats.module.css';

const defaultStats = { gamesPlayed: 0 };

// This is now a "presentational" component. It receives all data and functions as props.
const PlayerStats = ({ searchablePlayers, player1, player2, onPlayer1Change, onPlayer2Change }) => {
    const [selectedCompetition, setSelectedCompetition] = useState('all-competitions');
    const [selectedSeason, setSelectedSeason] = useState('all-time');

    // These handlers just update the local filter state. The player change handlers come from props.
    const handleCompetitionChange = useCallback((e) => setSelectedCompetition(e.target.value), []);
    const handleSeasonChange = useCallback((e) => {
        const newSeason = e.target.value;
        setSelectedSeason(newSeason);
        if (newSeason !== 'all-time' && selectedCompetition === 'all-competitions') setSelectedCompetition('premier-league');
        if (newSeason === 'all-time') setSelectedCompetition('all-competitions');
    }, [selectedCompetition]);

    const getStats = (player) => {
        if (!player || !player.stats) return defaultStats;
        const seasonData = player.stats[selectedSeason];
        if (!seasonData) return defaultStats;
        return seasonData[selectedCompetition] || defaultStats;
    };
    const player1Stats = getStats(player1);
    const player2Stats = getStats(player2);

    return (
        <div className={styles.playerStatsContainer}>
            <h2>Advanced Player Comparison</h2>
            <FilterBar
                selectedSeason={selectedSeason} onSeasonChange={handleSeasonChange}
                selectedCompetition={selectedCompetition} onCompetitionChange={handleCompetitionChange}
                // We no longer need the league filter here as it's a global concept now
            />
            <div className={styles.comparisonArea}>
                <PlayerCard player={player1} stats={player1Stats} opponentStats={player2Stats} allPlayers={searchablePlayers} onPlayerChange={onPlayer1Change} />
                <div className={styles.vsSeparator}>VS</div>
                <PlayerCard player={player2} stats={player2Stats} opponentStats={player1Stats} allPlayers={searchablePlayers} onPlayerChange={onPlayer2Change} />
            </div>
        </div>
    );
};
export default PlayerStats;
