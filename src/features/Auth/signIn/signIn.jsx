import React from "react";
import "./signIn.css";
import formImage from "../../../assets/backgrounds/form.webp";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/verify-code");
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="signin-container">
      {/* Lado izquierdo con la imagen */}
      <div className="signin-image">
        <img src={formImage} alt="Login visual" />
      </div>

      {/* Línea divisoria */}
      <div className="vertical-divider"></div>

      <div className="signin-form">
        <div className="form-wrapper">
          <h2>Login</h2>
          <p>Sign in to continue</p>

          <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />

            <button type="submit" className="signin-button">
              Sign In
            </button>

            <div className="forgot-password">
              <span
                onClick={handleForgotPassword}
              >
                Forgot your password?
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
