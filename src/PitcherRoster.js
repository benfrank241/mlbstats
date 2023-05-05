import React, { useState, useEffect } from "react";
import axios from "axios";

const RosterPitchers = ({ teamId }) => {
  const [roster, setRoster] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:5000/roster/${teamId}`);
      setRoster(response.data.roster);
      // console.log(response.data.roster)
    };

    fetchData();
  }, [teamId]);

  if (!roster) {
    return <div>Loading roster...</div>;
  }

  // Filter roster to show only pitchers
  const pitchers = roster.filter(player => player.position.abbreviation === 'P');

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
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
              <td>{player.person.fullName}</td>
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
  );
};

export default RosterPitchers;
