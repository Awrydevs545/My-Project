import React from 'react';
import SeasonFilter from './SeasonFilter';
import CompetitionFilter from './CompetitionFilter';
import styles from './FilterBar.module.css';

// This component is now much simpler.
const FilterBar = ({
    selectedSeason, onSeasonChange,
    selectedCompetition, onCompetitionChange,
    isSeasonView
}) => {
    return (
        <div className={styles.filterBar}>
            <SeasonFilter selected={selectedSeason} onChange={onSeasonChange} />
            <CompetitionFilter
                selected={selectedCompetition}
                onChange={onCompetitionChange}
                isSeasonView={isSeasonView}
            />
        </div>
    );
};

export default FilterBar;