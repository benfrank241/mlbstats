import React from "react";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HitterStats from "./HitterStats";
import PitcherStats from "./PitcherStats";
import Standings from "./Standings";
import News from "./News";
import HomePage from "./HomePage";
import NavBar from "./NavBar";
import RosterPitchers from "./PitcherRoster";
import RosterHitters from "./HitterRoster";
import Leaderboard from "./Leaderboard";
import "./PlayerStats.css";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hitter-stats/:playerId" element={<HitterStats />} />
        <Route path="/pitcher-stats/:playerId" element={<PitcherStats />} />
        <Route path="/standings" element={<Standings />} />
        <Route path="/news" element={<News />} />
        <Route path="/team-pitchers/:teamId" element={<RosterPitchers />} />
        <Route path="/team-hitters/:teamId" element={<RosterHitters />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
}

export default App;
