import React from "react";
import "./signUp.css"; // CSS que vamos a crear
import formImage from "../../../assets/backgrounds/form.png";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="signup-container">
      {/* Lado izquierdo con la imagen */}
      <div className="signup-image">
        <img src={formImage} alt="Form visual" />
      </div>

      {/* Lado derecho con el formulario */}

      <div className="signup-form">
        <div className="form-wrapper">
          <h2>Create new Account</h2>
          <p>
            Already Registered?{" "}
            <Link to="/signin" className="signin-link">
              Sign In
            </Link>
          </p>

          <form>
            <div className="form-group">
              <input type="text" placeholder="First Name" required />
              <input type="text" placeholder="Last Name" required />
            </div>

            <input type="email" placeholder="Email" required />

            <div className="form-group">
              <input
                type="text"
                placeholder="+Country Code"
                style={{ width: "30%" }}
                required
              />
              <input
                type="text"
                placeholder="Phone Number"
                style={{ width: "68%" }}
                required
              />
            </div>

            <input type="password" placeholder="Password" required />

            <button type="submit" className="signup-button">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
