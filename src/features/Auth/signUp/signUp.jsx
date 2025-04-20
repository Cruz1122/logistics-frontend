import React from "react";
import "./signUp.css";
import formImage from "../../../assets/backgrounds/form.png";
import { Link, useNavigate } from "react-router-dom"; // Importamos useNavigate

const SignUp = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí puedes agregar validaciones o llamadas a API si es necesario
    navigate("/verify-email"); // Redirige a la página de verificación de correo
  };

  return (
    <div className="signup-container">
      <div className="signup-image">
        <img src={formImage} alt="Form visual" />
      </div>

      {/* Línea divisoria */}
      <div className="vertical-divider"></div>

      <div className="signup-form">
        <div className="form-wrapper">
          <h2>Create new Account</h2>
          <p>
            Already Registered?{" "}
            <Link to="/signin" className="signin-link">
              Sign In
            </Link>
          </p>

          <form onSubmit={handleSubmit}>
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
