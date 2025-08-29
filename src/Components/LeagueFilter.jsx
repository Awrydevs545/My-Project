import React from 'react';
import styles from './CompetitionFilter.module.css'; // We can reuse the same clean styles

// The values here must match what TheSportsDB API expects for the league name
const leagues = [
    { name: "Premier League", value: "English Premier League" },
    { name: "La Liga", value: "Spanish La Liga" },
    { name: "Bundesliga", value: "German Bundesliga" },
    { name: "Serie A", value: "Italian Serie A" },
    { name: "Ligue 1", value: "French Ligue 1" },
];

const LeagueFilter = ({ selected, onChange }) => {
    return (
        <div className={styles.filterContainer}>
            <label htmlFor="league-select">Filter by League:</label>
            <select
                id="league-select"
                className={styles.filterSelect}
                value={selected}
                onChange={onChange}
            >
                {leagues.map(league => (
                    <option key={league.value} value={league.value}>
                        {league.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LeagueFilter;