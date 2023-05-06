import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "./PlayerStats.css";

const teamAbbreviations = {
  "Arizona Diamondbacks": "ARI",
  "Atlanta Braves": "ATL",
  "Baltimore Orioles": "BAL",
  "Boston Red Sox": "BOS",
  "Chicago Cubs": "CHC",
  "Chicago White Sox": "CWS",
  "Cincinnati Reds": "CIN",
  "Cleveland Guardians": "CLE",
  "Colorado Rockies": "COL",
  "Detroit Tigers": "DET",
  "Houston Astros": "HOU",
  "Kansas City Royals": "KC",
  "Los Angeles Angels": "LAA",
  "Los Angeles Dodgers": "LAD",
  "Miami Marlins": "MIA",
  "Milwaukee Brewers": "MIL",
  "Minnesota Twins": "MIN",
  "New York Mets": "NYM",
  "New York Yankees": "NYY",
  "Oakland Athletics": "OAK",
  "Philadelphia Phillies": "PHI",
  "Pittsburgh Pirates": "PIT",
  "San Diego Padres": "SD",
  "San Francisco Giants": "SF",
  "Seattle Mariners": "SEA",
  "St. Louis Cardinals": "STL",
  "Tampa Bay Rays": "TB",
  "Texas Rangers": "TEX",
  "Toronto Blue Jays": "TOR",
  "Washington Nationals": "WSH"
};
const getAbbreviation = (teamName) => {
  return teamAbbreviations[teamName] || teamName;
};

const HitterStats = () => {
  const { playerId } = useParams();
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:5000/player/${playerId}/stats?group=hitting&type=yearByYear`);
      setPlayer(response.data.people[0]);
      // console.log(response.data.people[0])
    };

    fetchData();
  }, [playerId]);

  if (!player) {
    return <div>Loading player stats...</div>;
  }

  const hittingStats = player.stats.find((stats) => stats.group.displayName === "hitting");

  let currentTeam;
  const currentTeamSplit = hittingStats.splits.find((split) => split.season === "2023");
  if (currentTeamSplit) {
    currentTeam = currentTeamSplit.team;
  } else {
    currentTeam = { id: null, name: "N/A" };
  }
  

  // Get the player's position
  const primaryPosition = player.primaryPosition.name;







  return (
    <div className="stats-container">
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
  {/* Player image */}
  <img src={`https://content.mlb.com/images/headshots/current/60x60/${playerId}.png`} alt="player" style={{ marginRight: "1.5rem", marginLeft: "6rem"}} />

  <h1 style={{color:"white"}}>
          {/* Player name */}
          {player.fullName}

          <span style={{ fontSize: "1rem", color: "White", marginLeft: "1rem" }}>
            {primaryPosition} |{" "}
            {currentTeam ? (
              <Link to={`/team-hitters/${currentTeam.id}`}>{currentTeam.name}</Link>
            ) : (
              "N/A"
            )}
          </span>

        </h1>

        {/* Player stats summary */}
        <div style={{ marginLeft: "auto", paddingLeft: "3rem", color: "white", paddingRight: "20rem"}}>

          <span>
            B/T: {player.batSide.description}/{player.pitchHand.description},
            Age: {player.currentAge}, Height: {player.height},
            Weight: {player.weight}, Year Drafted: {player.draftYear || "Not Drafted"}
          </span>

        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Year</th>
            <th>Team</th>
            <th>G</th>
            <th>PA</th>
            <th>AB</th>
            <th>AVG</th>
            <th>R</th>
            <th>H</th>
            <th>2B</th>
            <th>3B</th>
            <th>HR</th>
            <th>RBI</th>
            <th>SB</th>
            <th>BB</th>
            <th>OBP</th>
            <th>SLG</th>
            <th>OPS</th>
          </tr>
        </thead>
        <tbody>
          {hittingStats.splits.map((split) => (
            <tr key={split.season}>
              <td>{split.season}</td>
              <td>
                                {split.team ? (
                                    <Link to={`/team-pitchers/${split.team.id}`}>
                                        <img src={`https://www.mlbstatic.com/team-logos/${split.team.id}.svg`} alt={split.team.name} width="20" height="20" style={{ marginRight: "0.5rem" }} />
                                        {getAbbreviation(split.team.name)}
                                    </Link>
                                ) : (
                                    "Two or more teams"
                                )}
                            </td>
              <td>{split.stat.gamesPlayed}</td>
              <td>{split.stat.plateAppearances}</td>
              <td>{split.stat.atBats}</td>
              <td>{split.stat.avg}</td>
              <td>{split.stat.runs}</td>
              <td>{split.stat.hits}</td>
              <td>{split.stat.doubles}</td>
              <td>{split.stat.triples}</td>
              <td>{split.stat.homeRuns}</td>
              <td>{split.stat.rbi}</td>
              <td>{split.stat.stolenBases}</td>
              <td>{split.stat.baseOnBalls}</td>
              <td>{split.stat.obp}</td>
              <td>{split.stat.slg}</td>
              <td>{split.stat.ops}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default HitterStats;
