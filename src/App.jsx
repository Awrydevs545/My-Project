import React, {
    useState,
    useEffect,
    useCallback,
    useRef,
    Suspense,
    useContext // --- THE DEFINITIVE FIX IS HERE ---
} from 'react';
import { ThemeContext } from './components/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import { fetchAllPlayersFromLeague } from './components/api.jsx'; // ✅ fixed case


const PlayerStats = React.lazy(() => import('./components/PlayerStats'));
const Livestream = React.lazy(() => import('./components/Livestream'));
const FootballBulletin = React.lazy(() => import('./components/FootballBulletin'));

function App() {
  // This line was causing the crash because useContext was not imported
  const { theme } = useContext(ThemeContext);
  const refs = { statsRef: useRef(null), livestreamRef: useRef(null), bulletinRef: useRef(null) };

  const [searchablePlayers, setSearchablePlayers] = useState({});
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);
  const [loadingInitialData, setLoadingInitialData] = useState(true);
  const [selectedLeague, setSelectedLeague] = useState("English Premier League");

  useEffect(() => {
    // This effect sets the theme on the body tag
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const getLeagueData = async () => {
        setLoadingInitialData(true);
        const allLeaguePlayers = await fetchAllPlayersFromLeague(selectedLeague);
        if (allLeaguePlayers && allLeaguePlayers.length > 1) {
            const playersObject = allLeaguePlayers.reduce((obj, p) => ({ ...obj, [p.id]: p }), {});
            setSearchablePlayers(playersObject);
            setPlayer1(allLeaguePlayers[0]);
            setPlayer2(allLeaguePlayers[1]);
        }
        setLoadingInitialData(false);
    };
    getLeagueData();
  }, [selectedLeague]);

  const handlePlayer1Change = useCallback((player) => setPlayer1(player), []);
  const handlePlayer2Change = useCallback((player) => setPlayer2(player), []);
  const handleLeagueChange = useCallback((e) => setSelectedLeague(e.target.value), []);

  return (
    <div className="App">
      <Header
        refs={refs}
        searchablePlayers={searchablePlayers}
        onPlayerSearch={handlePlayer1Change}
        selectedLeague={selectedLeague}
        onLeagueChange={handleLeagueChange}
      />
      <main>
        <Suspense fallback={<div className="section-loader"><LoadingSpinner /></div>}>
          <div ref={refs.statsRef}>
            {loadingInitialData ? (
              <div className="section-loader"><LoadingSpinner /></div>
            ) : (
              <PlayerStats
                searchablePlayers={searchablePlayers}
                player1={player1}
                player2={player2}
                onPlayer1Change={handlePlayer1Change}
                onPlayer2Change={handlePlayer2Change}
              />
            )}
          </div>
          <div ref={refs.livestreamRef}><Livestream /></div>
          <div ref={refs.bulletinRef}><FootballBulletin /></div>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;