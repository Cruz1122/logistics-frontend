import React from "react";
import { Link } from "react-router-dom";
import "./serverError.css"; // opcional
import serverErrorIcon from "../../../assets/icons/serverError.svg";

function NotFound() {
  return (
    <div className="server-error-container">
      <img
        src={serverErrorIcon}
        alt="Server error"
        className="server-error-icon"
      />
      <h1>500 - Internal Server Error</h1>
      <p>Well, this is embarrassing... we’re working on it.</p>
      <Link to="/" className="main-button">
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
