const API_KEY = import.meta.env.VITE_SPORTSDB_API_KEY;
const BASE_URL = `https://www.thesportsdb.com/api/v1/json/${API_KEY}`;

// --- TEAM TIER MAPPING ---
const teamTiers = {
    "Manchester City": 1.4, "Real Madrid": 1.4, "Bayern Munich": 1.35, "Paris Saint-Germain": 1.35,
    "Arsenal": 1.3, "Liverpool": 1.3, "Barcelona": 1.3, "Manchester United": 1.25,
    "Chelsea": 1.2, "Inter Milan": 1.2, "AC Milan": 1.2, "Juventus": 1.2, "Borussia Dortmund": 1.2,
    "Tottenham": 1.15, "Atletico Madrid": 1.15, "Napoli": 1.15, "RB Leipzig": 1.1,
    "default": 1.0,
};

// --- QUALITY SCORE CALCULATOR ---
const calculateQualityScore = (rawPlayer) => {
    const wageString = rawPlayer.strWage || "";
    const signingString = rawPlayer.strSigning || "";
    const wage = parseInt(wageString.replace(/\D/g, ''), 10) || 0;
    const signing = parseInt(signingString.replace(/\D/g, ''), 10) || 0;
    if (wage > 200000 || signing > 80000000) return 1.5;
    if (wage > 150000 || signing > 60000000) return 1.35;
    if (wage > 100000 || signing > 40000000) return 1.2;
    if (wage > 50000 || signing > 20000000) return 1.1;
    const teamName = rawPlayer.strTeam;
    if (teamName && teamTiers[teamName]) return teamTiers[teamName];
    return teamTiers["default"];
};

// --- DATA GENERATION FACTORY ---
const seasons = ["2023/24", "2022/23", "2021/22", "2020/21", "2019/20"];
const competitions = { "premier-league": { games: 38 }, "la-liga": { games: 38 }, "bundesliga": { games: 34 }, "serie-a": { games: 38 }, "ligue-1": { games: 34 }, "champions-league": { games: 13 }, "europa-league": { games: 13 }, "fa-cup": { games: 6 }, "copa-del-rey": { games: 6 } };
const rand = (min, max) => Math.random() * (max - min) + min;

const generateCompetitionStats = (positionCategory, gamesPlayed, qualityScore) => {
    let base = { goals: gamesPlayed * rand(0.05, 0.1), assists: gamesPlayed * rand(0.05, 0.1), shotAccuracy: rand(65, 75), chancesCreated: gamesPlayed * rand(0.5, 1), successfulDribbles: gamesPlayed * rand(0.5, 1), passPct: rand(78, 88), tacklesWon: gamesPlayed * rand(0.5, 1), interceptions: gamesPlayed * rand(0.5, 1), clearances: gamesPlayed * rand(1, 1.5), aerialDuelsWon: gamesPlayed * rand(1, 1.5) };
    switch (positionCategory) {
        case "Attacker": base.goals *= rand(4, 8); base.assists *= rand(2, 3); base.shotAccuracy = Math.min(95, base.shotAccuracy * 1.15); base.successfulDribbles *= 1.5; break;
        case "Midfielder": base.goals *= rand(1.5, 2.5); base.assists *= rand(3, 5); base.passPct = Math.min(96, base.passPct * 1.1); base.chancesCreated *= 2.5; base.interceptions *= 1.2; break;
        case "Defender": base.tacklesWon *= rand(2.5, 4); base.interceptions *= rand(2, 3); base.clearances *= rand(3, 5); base.aerialDuelsWon *= rand(2, 3); base.passPct = Math.min(92, base.passPct * 1.05); break;
    }
    Object.keys(base).forEach(key => { base[key] *= qualityScore; base[key] = Math.round(base[key]); });
    return base;
};
const generateGoalkeeperStats = (gamesPlayed, qualityScore) => ({ savesPct: Math.min(95, Math.round(rand(70, 85) * qualityScore)), cleanSheets: Math.round(gamesPlayed * rand(0.3, 0.5) * qualityScore), saves: Math.round(gamesPlayed * rand(2.5, 4) * qualityScore), punches: Math.round(gamesPlayed * rand(0.3, 0.7) / qualityScore) });

/**
 * --- FINAL DATA TRANSFORMATION ENGINE ---
 */
const transformPlayerData = (rawPlayer) => {
    if (!rawPlayer || !rawPlayer.idPlayer) return null; // Early exit for invalid player data

    const position = rawPlayer.strPosition || "Unknown";
    let positionCategory = "Attacker";
    if (position.includes("Midfield")) positionCategory = "Midfielder";
    if (position.includes("Defender")) positionCategory = "Defender";
    if (position.includes("Goalkeeper")) positionCategory = "Goalkeeper";

    const qualityScore = calculateQualityScore(rawPlayer);
    const allTimeStats = {};
    const seasonalStats = {};

    for (const season of seasons) {
        seasonalStats[season] = {};
        for (const [compKey, compInfo] of Object.entries(competitions)) {
            const gamesPlayed = Math.round(compInfo.games * rand(0.7, 1));
            let compStats = (positionCategory === "Goalkeeper") ? generateGoalkeeperStats(gamesPlayed, qualityScore) : generateCompetitionStats(positionCategory, gamesPlayed, qualityScore);
            compStats.gamesPlayed = gamesPlayed;
            seasonalStats[season][compKey] = compStats;
        }
    }

    Object.values(seasonalStats).forEach(seasonData => Object.values(seasonData).forEach(compData => Object.entries(compData).forEach(([statKey, statValue]) => { allTimeStats[statKey] = (allTimeStats[statKey] || 0) + statValue; })));
    const totalCompetitions = seasons.length * Object.keys(competitions).length;
    ['passPct', 'shotAccuracy', 'savesPct'].forEach(key => { if (allTimeStats[key]) allTimeStats[key] = Math.round(allTimeStats[key] / totalCompetitions); });

    return {
        id: rawPlayer.idPlayer,
        name: rawPlayer.strPlayer,
        // --- THE DEFINITIVE FIX FOR THE TYPO ---
        image: rawPlayer.strCutout || rawPlayer.strRender || rawPlayer.strThumb || 'https://via.placeholder.com/150/FFFFFF/000000/?text=No+Image',
        club: rawPlayer.strTeam || "Free Agent",
        nationality: rawPlayer.strNationality || "Unknown",
        position: position,
        stats: { "all-time": { "all-competitions": allTimeStats }, ...seasonalStats }
    };
};

/**
 * --- FINAL, RESILIENT DATA FETCHING FUNCTION ---
 */
export const fetchAllPlayersFromLeague = async (leagueName) => {
    try {
        const teamsResponse = await fetch(`${BASE_URL}/search_all_teams.php?l=${encodeURIComponent(leagueName)}`);
        const teamsData = await teamsResponse.json();
        if (!teamsData.teams) return [];

        const playerPromises = teamsData.teams.map(team =>
            fetch(`${BASE_URL}/lookup_all_players.php?id=${team.idTeam}`).then(res => res.json())
        );
        const results = await Promise.all(playerPromises);
        const allPlayersArrays = results.map(result => result.player || []);
        const flattenedPlayers = allPlayersArrays.flat();

        // --- NEW RESILIENCE LOGIC ---
        // We map and transform here, wrapping each transformation in a try-catch.
        // This prevents one bad player object from crashing the whole process.
        const transformedPlayers = flattenedPlayers.map(player => {
            try {
                // If transformPlayerData returns null (for invalid players), it will be filtered out later.
                return transformPlayerData(player);
            } catch (error) {
                console.error(`Failed to transform data for player: ${player?.strPlayer}`, error);
                return null; // Return null if transformation fails for this specific player
            }
        });
        
        // Filter out any null values that resulted from invalid data or failed transformations.
        return transformedPlayers.filter(p => p !== null);

    } catch (error) {
        console.error("Major failure in fetchAllPlayersFromLeague:", error);
        return []; // Return empty array on major failure (e.g., network error)
    }
};