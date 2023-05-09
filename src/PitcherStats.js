import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PlayerStats.css"
import { useParams, Link } from "react-router-dom";

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

const PitcherStats = () => {
    const { playerId } = useParams();
    const [player, setPlayer] = useState(null);
    const [careerStats, setCareerStats] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`http://localhost:5000/player/${playerId}/stats?group=pitching&type=yearByYear`);
            setPlayer(response.data.people[0]);
            // console.log(response.data.people[0])
        };
        fetchData();
    }, [playerId]);

    useEffect(() => {
        const fetchCareerData = async () => {
            const response = await axios.get(`http://localhost:5000/player/${playerId}/career/pitching`);
            setCareerStats(response.data.people[0]);
            console.log(response.data.people[0])
        };
        fetchCareerData();
    }, [playerId]);

    if (!player) {
        return <div>Loading player stats...</div>;
    }

    const pitchingStats = player.stats.find((stats) => stats.group.displayName === "pitching");

    let currentTeam;

    if (player.fullName === 'Jay Jackson') {
        currentTeam = { id: 141, name: 'Toronto Blue Jays' };
    } else if (player.fullName === 'Adam Wainwright' || player.fullName === 'James Naile') {
        currentTeam = { id: 138, name: 'St. Louis Cardinals' };
    } else if (player.fullName === 'Bennett Sousa') {
        currentTeam = { id: 158, name: 'Milwaukee Brewers' };
    } else {
        const currentTeamSplit = pitchingStats.splits.find((split) => split.season === "2023");
        if (currentTeamSplit) {
            currentTeam = currentTeamSplit.team;
        } else {
            currentTeam = { id: 141, name: "N/A" };
        }
    }





    // Get the player's position
    const primaryPosition = player.primaryPosition.name;



    return (
        <div className="stats-container">
        <div>
            <div style={{ display: "flex", alignItems: "center", marginLeft: "10%", marginRight: "1rem"  }}>
                {/* Placeholder for player image */}
                <img src={`https://content.mlb.com/images/headshots/current/60x60/${playerId}@2x.png`} alt="player" />

                <h1 style={{color:"white"}}>
                    {/* Player name */}
                    {player.fullName}

                    {/* Player position and current team */}
                    <span style={{ fontSize: "1rem", color: "white", marginLeft: "1rem" }}>
                        {primaryPosition} |{" "}
                        {currentTeam ? (
                            <Link to={`/team-pitchers/${currentTeam.id}`}>{currentTeam.name}</Link>
                        ) : (
                            "N/A"
                        )}
                    </span>

                </h1>

                <div className="player-stats-summary">
  <div className="player-stats-row">
    <span className="player-stats-label">B/T:</span>
    <span className="player-stats-value">{player.batSide.description}/{player.pitchHand.description}</span>
    <span className="player-stats-label">Age:</span>
    <span className="player-stats-value">{player.currentAge}</span>
    <span className="player-stats-label">Height:</span>
    <span className="player-stats-value">{player.height}</span>
  </div>
  <div className="player-stats-row">
    <span className="player-stats-label">Weight:</span>
    <span className="player-stats-value">{player.weight} lbs</span>
    <span className="player-stats-label">Year Drafted:</span>
    <span className="player-stats-value">{player.draftYear || "Not Drafted"}</span>
  </div>
</div>

            </div>
            <table>
                <thead>
                    <tr>
                        <th>Year</th>
                        <th>Team</th>
                        <th>G</th>
                        <th>IP</th>
                        <th>W</th>
                        <th>L</th>
                        <th>SV</th>
                        <th>ERA</th>
                        <th>WHIP</th>
                        <th>H</th>
                        <th>R</th>
                        <th>SO</th>
                        <th>BB</th>
                        <th>HR/9</th>
                        <th>K/BB</th>
                        <th>K/9</th>
                        <th>OPS</th>
                    </tr>
                </thead>
                <tbody>
                    {pitchingStats.splits.filter((split) => split.team).map((split, index) => (
                        <tr key={index}>
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
                            <td>{split.stat.inningsPitched}</td>
                            <td>{split.stat.wins}</td>
                            <td>{split.stat.losses}</td>
                            <td>{split.stat.saves}</td>
                            <td>{split.stat.era}</td>
                            <td>{split.stat.whip}</td>
                            <td>{split.stat.hits}</td>
                            <td>{split.stat.runs}</td>
                            <td>{split.stat.strikeOuts}</td>
                            <td>{split.stat.baseOnBalls}</td>
                            <td>{split.stat.homeRunsPer9}</td>
                            <td>{split.stat.strikeoutWalkRatio}</td>
                            <td>{split.stat.strikeoutsPer9Inn}</td>
                            <td>{split.stat.ops}</td>
                        </tr>
                    ))}

                </tbody>
                {careerStats ? (
    <tfoot>
        <tr>
            <td>Career</td>
            <td></td>
            <td>{careerStats.stats[0].splits[0].stat.gamesPlayed}</td>
            <td>{careerStats.stats[0].splits[0].stat.inningsPitched}</td>
            <td>{careerStats.stats[0].splits[0].stat.wins}</td>
            <td>{careerStats.stats[0].splits[0].stat.losses}</td>
            <td>{careerStats.stats[0].splits[0].stat.saves}</td>
            <td>{careerStats.stats[0].splits[0].stat.era}</td>
            <td>{careerStats.stats[0].splits[0].stat.whip}</td>
            <td>{careerStats.stats[0].splits[0].stat.hits}</td>
            <td>{careerStats.stats[0].splits[0].stat.runs}</td>
            <td>{careerStats.stats[0].splits[0].stat.strikeOuts}</td>
            <td>{careerStats.stats[0].splits[0].stat.baseOnBalls}</td>
            <td>{careerStats.stats[0].splits[0].stat.homeRunsPer9}</td>
            <td>{careerStats.stats[0].splits[0].stat.strikeoutWalkRatio}</td>
            <td>{careerStats.stats[0].splits[0].stat.strikeoutsPer9Inn}</td>
            <td>{careerStats.stats[0].splits[0].stat.ops}</td>
        </tr>
    </tfoot>
) : null}

            </table>
        </div>
        {player.fullName === 'Shohei Ohtani' ? (
  <button onClick={() => window.location.href = `/hitter-stats/${playerId}`}>
    Hitting Stats
  </button>
) : null}
        </div>
    );
};

export default PitcherStats;
