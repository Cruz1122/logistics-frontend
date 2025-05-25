import React from "react";
import { Link } from "react-router-dom";
import "./inactive.css"; // opcional
import inactiveIcon from "../../../assets/icons/inactive.svg";
import { logoutUser } from "../../../redux/authSlice";
import { useDispatch } from "react-redux";

function Inactive() {
  const dispatch = useDispatch();
  dispatch(logoutUser());

  return (
    <div className="inactive-container">
      <img
        src={inactiveIcon}
        alt="User Banned"
        className="inactive-icon"
      />
      <h1>Oops! Account on Vacation</h1>
      <p>
        Looks like your account decided to take a break and is{" "}
        <strong style={{ color: "red" }}>currently inactive</strong>.
        <br />
        If you think it should get back to work,
        contact the <strong>administrator</strong>.
      </p>
      <Link to="/signin" className="main-button">
        Try signing in anyway
      </Link>
    </div>
  );
}

export default Inactive;
