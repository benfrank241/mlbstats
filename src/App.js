import React from "react";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HitterStats from "./Players/HitterStats";
import PitcherStats from "./Players/PitcherStats";
import Standings from "./Components/Standings";
import News from "./Components/News";
import HomePage from "./Components/HomePage";
import NavBar from "./Components/NavBar";
import RosterPitchers from "./Rosters/PitcherRoster";
import RosterHitters from "./Rosters/HitterRoster";
import Leaderboard from "./Components/Leaderboard";
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
