import React from 'react';
import styles from './CompetitionFilter.module.css'; // We can reuse the same styles

const seasons = ["all-time", "2023/24", "2022/23", "2021/22", "2020/21", "2019/20"];

const SeasonFilter = ({ selected, onChange }) => {
    return (
        <div className={styles.filterContainer}>
            <label htmlFor="season-select">Filter by Season:</label>
            <select
                id="season-select"
                className={styles.filterSelect}
                value={selected}
                onChange={onChange}
            >
                {seasons.map(season => (
                    <option key={season} value={season}>
                        {season === 'all-time' ? 'All Time Career' : season}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SeasonFilter;