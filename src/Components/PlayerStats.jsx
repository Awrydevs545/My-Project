import React, { useState } from 'react';
import { players } from '../Components/playerDatabase'; // Import player data
import './PlayerStats.css';
import bgImage from '../assets/images/player-stats-bg.jpg';

// Helper function to highlight the better stat
const HighlightStat = ({ stat1, stat2 }) => {
    if (stat1 > stat2) return <span className="highlight-better">{stat1}</span>;
    if (stat2 > stat1) return <span>{stat1}</span>;
    return <span>{stat1}</span>; // Equal stats
};

const PlayerStats = () => {
    const [player1, setPlayer1] = useState(players.messi);
    const [player2, setPlayer2] = useState(players.ronaldo);

    const handlePlayer1Change = (e) => setPlayer1(players[e.target.value]);
    const handlePlayer2Change = (e) => setPlayer2(players[e.target.value]);

    return (
        <div
        className="player-stats-container"
        style={{ backgroundImage: `url(${bgImage})` }}>
            <h2>Player Comparison</h2>
            <div className="comparison-area">
                {/* Player 1 Card */}
                <div className="player-card">
                    <img src={player1.image} alt={player1.name} className="player-image" />
                    <h3>{player1.name}</h3>
                    <select onChange={handlePlayer1Change} value={player1.id}>
                        {Object.values(players).map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                    <div className="stats-list">
                        <p>Goals: <HighlightStat stat1={player1.stats.goals} stat2={player2.stats.goals} /></p>
                        <p>Assists: <HighlightStat stat1={player1.stats.assists} stat2={player2.stats.assists} /></p>
                        <p>Appearances: <HighlightStat stat1={player1.stats.appearances} stat2={player2.stats.appearances} /></p>
                    </div>
                </div>

                <div className="vs-separator">VS</div>

                {/* Player 2 Card */}
                <div className="player-card">
                    <img src={player2.image} alt={player2.name} className="player-image" />
                    <h3>{player2.name}</h3>
                    <select onChange={handlePlayer2Change} value={player2.id}>
                        {Object.values(players).map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                    <div className="stats-list">
                        <p>Goals: <HighlightStat stat1={player2.stats.goals} stat2={player1.stats.goals} /></p>
                        <p>Assists: <HighlightStat stat1={player2.stats.assists} stat2={player1.stats.assists} /></p>
                        <p>Appearances: <HighlightStat stat1={player2.stats.appearances} stat2={player1.stats.appearances} /></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayerStats;