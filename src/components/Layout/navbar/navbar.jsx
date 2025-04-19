import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import truckIcon from '../../../assets/backgrounds/icon.png';
import './navbar.css';

const Navbar = () => {
  const location = useLocation(); // 👈 Hook para conocer la ruta actual

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" className="navbar-logo-link">
            <img src={truckIcon} alt="Logo" className="navbar-logo white-logo" />
          </Link>
          <Link to="/" className="navbar-title-link">
            <span className="navbar-title">LogicSmart360</span>
          </Link>
        </div>
        <nav className="navbar-right">
          {location.pathname !== "/signin" && (
            <Link to="/signin" className="navbar-link">Sign In</Link>
          )}
          {location.pathname !== "/signup" && (
            <Link to="/signup" className="navbar-link">Sign Up</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
