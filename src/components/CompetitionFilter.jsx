import React from 'react';
import { competitions } from './competitions';
import styles from './CompetitionFilter.module.css';

// It now receives a prop to know if we are in a season view
const CompetitionFilter = ({ selected, onChange, isSeasonView }) => {
    // Filter out the "All Time Stats" option if a specific season is selected
    const filteredCompetitions = isSeasonView
        ? competitions.filter(group => group.label !== "Overall Career")
        : competitions;

    return (
        <div className={styles.filterContainer}>
            <label htmlFor="competition-select">Filter by Competition:</label>
            <select id="competition-select" className={styles.filterSelect} value={selected} onChange={onChange}>
                {filteredCompetitions.map(group => (
                    <optgroup key={group.label} label={group.label}>
                        {group.options.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.name}
                            </option>
                        ))}
                    </optgroup>
                ))}
            </select>
        </div>
    );
};

export default CompetitionFilter;