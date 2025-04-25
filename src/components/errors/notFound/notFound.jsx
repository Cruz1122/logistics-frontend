import React from "react";
import { Link } from "react-router-dom";
import "./notFound.css"; // opcional
import NotFoundIcon from "../../../assets/icons/notFound.svg"; // opcional

function NotFound() {
  return (
    <div className="not-found-container">
      <img src={NotFoundIcon} alt="Not Found" className="not-found-icon" />
      <h1>404 - Not Found</h1>
      <p>There’s nothing here. Nothing.</p>
      <Link to="/" className="main-button">
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
