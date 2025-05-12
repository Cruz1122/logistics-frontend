import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import truckIcon from "../../../assets/backgrounds/icon.webp";
import "./navbar.css";

const Navbar = () => {
  const location = useLocation();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const isOnDashboard = location.pathname === "/dashboard";
  const isOnUserProfile = location.pathname === "/userProfile";
  const isOnSignin = location.pathname === "/signin";
  const isOnSignup = location.pathname === "/signup";

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" className="navbar-logo-link">
            <img
              src={truckIcon}
              alt="Logo"
              className="navbar-logo white-logo"
            />
          </Link>
          <Link to="/" className="navbar-title-link">
            <span className="navbar-title">LogicSmart360</span>
          </Link>
        </div>
        <nav className="navbar-right">
          {!isAuthenticated && !isOnSignin && (
            <Link to="/signin" className="navbar-link">
              Sign In
            </Link>
          )}
          {!isAuthenticated && !isOnSignup && (
            <Link to="/signup" className="navbar-link">
              Sign Up
            </Link>
          )}
          {isAuthenticated && (
            <>
              {!isOnUserProfile && (
                <Link to="/userProfile" className="navbar-link">
                Profile
              </Link>
              )}

              {!isOnDashboard && (
                <Link to="/dashboard" className="navbar-link">
                  Management Panel
                </Link>
              )}
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
