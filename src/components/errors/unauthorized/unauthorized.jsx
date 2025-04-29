import React from "react";
import { Link } from "react-router-dom";
import "./unauthorized.css"; // opcional
import unauthorizedIcon from "../../../assets/icons/unauthorized.svg";

function NotFound() {
  return (
    <div className="unauthorized-container">
      <img
        src={unauthorizedIcon}
        alt="Unauthorized"
        className="unauthorized-icon"
      />
      <h1>401 - Unauthorized</h1>
      <p>Access denied. Are you logged in?</p>
      <Link to="/signin" className="main-button">
        Sign In
      </Link>
    </div>
  );
}

export default NotFound;
