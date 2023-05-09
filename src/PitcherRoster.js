import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const teamDivisions = {
  "Baltimore Orioles": 0,
  "Boston Red Sox": 0,
  "New York Yankees": 0,
  "Tampa Bay Rays": 0,
  "Toronto Blue Jays": 0,
  "Chicago White Sox": 1,
  "Cleveland Indians": 1,
  "Detroit Tigers": 1,
  "Kansas City Royals": 1,
  "Minnesota Twins": 1,
  "Houston Astros": 2,
  "Los Angeles Angels": 2,
  "Oakland Athletics": 2,
  "Seattle Mariners": 2,
  "Texas Rangers": 2,
  "Atlanta Braves": 3,
  "Miami Marlins": 3,
  "New York Mets": 3,
  "Philadelphia Phillies": 3,
  "Washington Nationals": 3,
  "Chicago Cubs": 4,
  "Cincinnati Reds": 4,
  "Milwaukee Brewers": 4,
  "Pittsburgh Pirates": 4,
  "St. Louis Cardinals": 4,
  "Arizona Diamondbacks": 5,
  "Colorado Rockies": 5,
  "Los Angeles Dodgers": 5,
  "San Diego Padres": 5,
  "San Francisco Giants": 5
};

const divisionMap = {
  0: 'AL East',
  1: 'AL Central',
  2: 'AL West',
  3: 'NL Central',
  4: 'NL East',
  5: 'NL West',
};

const RosterPitchers = () => {
  const { teamId } = useParams();
  const [roster, setRoster] = useState(null);
  const [standings, setStandings] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:5000/roster/${teamId}`);
      setRoster(response.data.roster);
      // console.log(response.data.roster)
    };

    fetchData();
  }, [teamId]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:5000/standings/test`);
      const teamName = roster[0].person.stats[0].splits[0].team.name;
      const division = teamDivisions[teamName];
      console.log(division)
      const divisonData = response.data.records[division].teamRecords;

      // get only data for team
      const data = divisonData.find((team) => team.team.name === teamName);
      console.log(data)

      setStandings(data);
    };

    if (roster) {
      fetchData();
    }
  }, [roster]);

  if (!standings) {
    return <div>Loading roster...</div>;
  }


  // Filter roster to show only pitchers and two-way players
  const pitchers = roster.filter(player => player.position.abbreviation === 'P' || player.position.abbreviation === 'TWP');

  // Get the team name
  const teamName = roster[0].person.stats[0].splits[0].team.name;

  function getOrdinalSuffix(number) {
    const suffixes = ["th", "st", "nd", "rd"];
    const lastDigit = number % 10;
    const secondLastDigit = Math.floor(number / 10) % 10;

    if (secondLastDigit === 1) {
      return `${number}th`;
    } else if (lastDigit <= 3) {
      return `${number}${suffixes[lastDigit]}`;
    } else {
      return `${number}th`;
    }
  }

  return (
    <div>
      <div className="stats-container">
        <div style={{ display: "flex", alignItems: "center", marginLeft: "11%", marginTop: "1%", marginBottom: "1%" }}>
          {/* Player image */}
          <img src={`https://www.mlbstatic.com/team-logos/${teamId}.svg`} alt="player" style={{
            marginRight: "1.5rem",
            height: "100px",
            width: "100px",
            borderRadius: "20%",
            backgroundColor: "white",
            padding: "5px",
            objectFit: "contain"
          }} />
          <div style={{ color: "white" }}>
            {/* Team name */}
            <h1 style={{ marginBottom: 0 }}>{teamName}</h1>

            {/* Division rank and record */}
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ marginRight: "1rem", color: "#3E9FCA" }}>
                {getOrdinalSuffix(standings.divisionRank)} in {divisionMap[teamDivisions[teamName]]}
              </span>
              <span style={{ fontWeight: "bold" }}>
                {standings.wins}-{standings.losses} ({standings.winningPercentage}) • {standings.sportGamesBack} GB
              </span>
            </div>
            </div>
            <div classname="rosterbutton">
                <div style={{ position: "relative", right: 0, width: "200px", height: "70px", backgroundColor: "white", borderRadius: "50px", overflow: "hidden" }}>
                  {/* Interior oval on the hitter side */}
                  <div style={{ position: "absolute", top: "10%", left: "10%", width: "80%", height: "80%", backgroundColor: "white", borderRadius: "50%" }}></div>

                  {/* Blue oval highlighting the "View Hitters" link */}
                  <div style={{ position: "absolute", top: 0, left: 0, width: "50%", height: "100%", backgroundColor: "white", borderRadius: "50px" }}>
                    {/* "View Hitters" link */}
                    <Link to={`/team-hitters/${teamId}`} style={{ textDecoration: "none", display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%", color: "#3E9FCA" }}>
                      <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>Hitters</span>
                    </Link>
                  </div>

                  {/* Blue oval highlighting the "View Pitchers" link */}
                  <div style={{ position: "absolute", top: 0, left: "50%", width: "50%", height: "100%", backgroundColor: "#3E9FCA", borderRadius: "50px"}}>
                    {/* "View Pitchers" link */}
                    <Link to={`/team-pitchers/${teamId}`} style={{ textDecoration: "none", display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%", color: "white", position: "relative", left: "calc(-65% + 75px)" }}>
                      <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>Pitchers</span>
                    </Link>
                  </div>
                </div>
              </div>
        </div>
      </div>
      <div></div>
      <div>
      <table>
        <thead>
          <tr>
            <th>Pos</th>
            <th>#</th>
            <th>Pitcher</th>
            <th>Age</th>
            <th>T</th>
            <th>IP</th>
            <th>ERA</th>
            <th>SO</th>
            <th>BB</th>
            <th>WHIP</th>
            <th>K/BB</th>
            <th>HR/9</th>
            <th>OPS</th>
            <th>W</th>
            <th>L</th>
            <th>SV</th>
          </tr>
        </thead>
        <tbody>
          {pitchers.map((player) => (
            <tr key={player.person.id}>
              <td>{player.position.abbreviation}</td>
              <td>{player.jerseyNumber}</td>
              <td style={{ display: "flex", alignItems: "center", padding: "0px", color: "blue" }}>
                <img
                  src={`https://content.mlb.com/images/headshots/current/60x60/${player.person.id}.png`}
                  alt="player"
                  style={{ marginRight: "1rem", height: "50px", border: "none" }}
                />
                <Link
                  to={`/pitcher-stats/${player.person.id}`}
                  style={{ textDecoration: "none", color: "inherit", fontSize: "1rem" }}
                >
                  {player.person.fullName}
                </Link>
              </td>
              <td>{player.person.currentAge}</td>
              <td>{player.person.pitchHand.code}</td>
              <td>{player.person.stats && player.person.stats[0].splits && player.person.stats[0].splits[0].stat && player.person.stats[0].splits[0].stat.inningsPitched}</td>
              <td>{player.person.stats && player.person.stats[0].splits && player.person.stats[0].splits[0].stat && player.person.stats[0].splits[0].stat.era}</td>
              <td>{player.person.stats && player.person.stats[0].splits && player.person.stats[0].splits[0].stat && player.person.stats[0].splits[0].stat.strikeOuts}</td>
              <td>{player.person.stats && player.person.stats[0].splits && player.person.stats[0].splits[0].stat && player.person.stats[0].splits[0].stat.baseOnBalls}</td>
              <td>{player.person.stats && player.person.stats[0].splits && player.person.stats[0].splits[0].stat && player.person.stats[0].splits[0].stat.whip}</td>
              <td>{player.person.stats && player.person.stats[0].splits && player.person.stats[0].splits[0].stat && player.person.stats[0].splits[0].stat.strikeoutWalkRatio}</td>
              <td>{player.person.stats && player.person.stats[0].splits && player.person.stats[0].splits[0].stat && player.person.stats[0].splits[0].stat.homeRunsPer9}</td>
              <td>{player.person.stats && player.person.stats[0].splits && player.person.stats[0].splits[0].stat && player.person.stats[0].splits[0].stat.ops}</td>
              <td>{player.person.stats && player.person.stats[0].splits && player.person.stats[0].splits[0].stat && player.person.stats[0].splits[0].stat.wins}</td>
              <td>{player.person.stats && player.person.stats[0].splits && player.person.stats[0].splits[0].stat && player.person.stats[0].splits[0].stat.losses}</td>
              <td>{player.person.stats && player.person.stats[0].splits && player.person.stats[0].splits[0].stat && player.person.stats[0].splits[0].stat.saves}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default RosterPitchers;
