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



const RosterHitters = () => {
  const { teamId } = useParams();
  const [roster, setRoster] = useState(null);
  const [standings, setStandings] = useState(null);

  useEffect(() => {
    const fetchData = async () => {

      const response = await axios.get(`http://localhost:5000/roster/${teamId}`);
      setRoster(response.data.roster);
      //   console.log(response.data.roster)
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

  // Filter roster to show only pitchers
  const hitters = roster.filter(player => player.person.fullName !== 'Shohei Ohtani')
    .filter(player => player.position.abbreviation !== 'P');

  // Get the team name
  const teamName = roster[0].person.stats[0].splits[0].team.name;

  return (
    <div>
      <div className="stats-container">
        <div style={{ display: "flex", alignItems: "center", marginLeft: "11%", marginTop: "1%" }}>
          {/* Player image */}
          <img src={`https://www.mlbstatic.com/team-logos/${teamId}.svg`} alt="player" style={{
            marginRight: "1.5rem",
            height: "80px",
            borderRadius: "50%",
            backgroundColor: "white",
            padding: "5px"
          }} />

          <h1 style={{ color: "white" }}>
            {/* Team name */}
            {teamName} 
          </h1>
          <div style={{color: "white"}}>
            {/* Team record */}
            {standings.divisionRank} in {divisionMap[teamDivisions[teamName]]}
          {standings.wins} - {standings.losses} ({standings.winningPercentage}) • ({standings.sportGamesBack} GB)

          </div>
        </div>
      </div>
      <div>

      </div>
      <div>
        <Link to={`/team-pitchers/${teamId}`}>
          <button>View Pitchers</button>
        </Link>
        <table>
          <thead>
            <tr>
              <th>Pos</th>
              <th>#</th>
              <th>Name</th>
              <th>Age</th>
              <th>B</th>
              <th>T</th>
              <th>AVG</th>
              <th>PA</th>
              <th>H</th>
              <th>2B</th>
              <th>3B</th>
              <th>HR</th>
              <th>SB</th>
              <th>SO</th>
              <th>SLG</th>
              <th>BABIP</th>
              <th>OBP</th>
              <th>OPS</th>
            </tr>
          </thead>
          <tbody>
            {hitters.map((player) => (
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
                    to={`/hitter-stats/${player.person.id}`}
                    style={{ textDecoration: "none", color: "inherit", fontSize: "1rem" }}
                  >
                    {player.person.fullName}
                  </Link>
                </td>
                <td>{player.person.currentAge}</td>
                <td>{player.person.batSide.code}</td>
                <td>{player.person.pitchHand.code}</td>
                <td>{player.person.stats && player.person.stats[0].splits && player.person.stats[0].splits[0].stat && player.person.stats[0].splits[0].stat.avg}</td>
                <td>{player.person.stats && player.person.stats[0].splits && player.person.stats[0].splits[0].stat && player.person.stats[0].splits[0].stat.plateAppearances}</td>
                <td>{player.person.stats && player.person.stats[0].splits && player.person.stats[0].splits[0].stat && player.person.stats[0].splits[0].stat.hits}</td>
                <td>{player.person.stats && player.person.stats[0].splits && player.person.stats[0].splits[0].stat && player.person.stats[0].splits[0].stat.doubles}</td>
                <td>{player.person.stats && player.person.stats[0].splits && player.person.stats[0].splits[0].stat && player.person.stats[0].splits[0].stat.triples}</td>
                <td>{player.person.stats && player.person.stats[0].splits && player.person.stats[0].splits[0].stat && player.person.stats[0].splits[0].stat.homeRuns}</td>
                <td>{player.person.stats && player.person.stats[0].splits && player.person.stats[0].splits[0].stat && player.person.stats[0].splits[0].stat.stolenBases}</td>
                <td>{player.person.stats && player.person.stats[0].splits && player.person.stats[0].splits[0].stat && player.person.stats[0].splits[0].stat.strikeOuts}</td>
                <td>{player.person.stats && player.person.stats[0].splits && player.person.stats[0].splits[0].stat && player.person.stats[0].splits[0].stat.slg}</td>
                <td>{player.person.stats && player.person.stats[0].splits && player.person.stats[0].splits[0].stat && player.person.stats[0].splits[0].stat.babip}</td>
                <td>{player.person.stats && player.person.stats[0].splits && player.person.stats[0].splits[0].stat && player.person.stats[0].splits[0].stat.obp}</td>
                <td>{player.person.stats && player.person.stats[0].splits && player.person.stats[0].splits[0].stat && player.person.stats[0].splits[0].stat.ops}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RosterHitters;
