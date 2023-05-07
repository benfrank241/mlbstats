import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  const [activeTab, setActiveTab] = useState('home');
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/leaderboard') {
      setActiveTab('leaderboard');
    } else {
      setActiveTab('home');
    }
  }, [location]);
  

  return (
    <nav className="navbar">
      <Link to="/" onClick={() => setActiveTab('home')}>
  <img src="/homebase.png" alt="hombase-logo" className="navbar-logo" />
</Link>

      <ul className="navbar-nav">
        <li className="nav-item">
          <Link
            to="/"
            className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
          >
            Teams
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/leaderboard"
            className={`nav-link ${activeTab === 'leaderboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('leaderboard')}
          >
            Leaderboard
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
