import messiImg from '../assets/images/messi.png';
import ronaldoImg from '../assets/images/ronaldo.png';
import haalandImg from '../assets/images/haaland.png';
import mbappeImg from '../assets/images/mbappe.png';

// NOTE: These are example stats for demonstration purposes.
export const players = {
    messi: {
        id: 'messi',
        name: 'Lionel Messi',
        image: messiImg,
        stats: {
            "all-time": { goals: 837, assists: 372, shotAccuracy: 86 },
            "la-liga": { goals: 474, assists: 216, shotAccuracy: 87 },
            "champions-league": { goals: 129, assists: 40, shotAccuracy: 85 },
            "ligue-1": { goals: 22, assists: 30, shotAccuracy: 81 },
            "copa-del-rey": { goals: 56, assists: 35, shotAccuracy: 88 },
        }
    },
    ronaldo: {
        id: 'ronaldo',
        name: 'Cristiano Ronaldo',
        image: ronaldoImg,
        stats: {
            "all-time": { goals: 895, assists: 251, shotAccuracy: 85 },
            "la-liga": { goals: 311, assists: 95, shotAccuracy: 84 },
            "premier-league": { goals: 103, assists: 37, shotAccuracy: 82 },
            "serie-a": { goals: 81, assists: 17, shotAccuracy: 86 },
            "champions-league": { goals: 140, assists: 42, shotAccuracy: 87 },
        }
    },
    haaland: {
        id: 'haaland',
        name: 'Erling Haaland',
        image: haalandImg,
        stats: {
            "all-time": { goals: 280, assists: 60, shotAccuracy: 91 },
            "premier-league": { goals: 63, assists: 11, shotAccuracy: 92 },
            "bundesliga": { goals: 62, assists: 19, shotAccuracy: 90 },
            "champions-league": { goals: 41, assists: 5, shotAccuracy: 93 },
            "dfb-pokal": { goals: 8, assists: 2, shotAccuracy: 91 },
        }
    },
    mbappe: {
        id: 'mbappe',
        name: 'Kylian Mbappé',
        image: mbappeImg,
        stats: {
            "all-time": { goals: 330, assists: 150, shotAccuracy: 88 },
            "ligue-1": { goals: 191, assists: 93, shotAccuracy: 89 },
            "champions-league": { goals: 48, assists: 26, shotAccuracy: 87 },
            "coupe-de-france": { goals: 35, assists: 18, shotAccuracy: 90 },
        }
    },
};