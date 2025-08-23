import React, { useRef } from 'react';
import './App.css';
import Header from './components/Header';
import PlayerStats from './components/PlayerStats';
import Livestream from './components/Livestream';
import FootballBulletin from './components/FootballBulletin';
import Footer from './components/Footer';

function App() {
  // Create refs for each main section
  const statsRef = useRef(null);
  const livestreamRef = useRef(null);
  const bulletinRef = useRef(null);

  return (
    <div className="App">
      {/* Pass the refs to the Header component */}
      <Header refs={{ statsRef, livestreamRef, bulletinRef }} />
      <main>
        {/* Attach the refs to the corresponding section containers */}
        <div ref={statsRef}><PlayerStats /></div>
        <div ref={livestreamRef}><Livestream /></div>
        <div ref={bulletinRef}><FootballBulletin /></div>
      </main>
      <Footer />
    </div>
  );
}

export default App;