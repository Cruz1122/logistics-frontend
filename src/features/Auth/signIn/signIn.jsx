import React from "react";
import "./signIn.css"; // CSS que vamos a crear
import formImage from "../../../assets/backgrounds/form.png";
import { useNavigate } from "react-router-dom"; // Para redirección

const SignIn = () => {
  const navigate = useNavigate(); // Hook de navegación

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí puedes hacer validaciones o llamada a API
    // Si todo está bien, redirige a /2fa
    navigate("/verify-code"); // Redirige a la página de verificación
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password"); // Redirige a la página de "Forgot Password"
  };

  return (
    <div className="signup-container">
      {/* Lado izquierdo con la imagen */}
      <div className="signup-image">
        <img src={formImage} alt="Form visual" />
      </div>

      {/* Línea divisoria */}
      <div className="vertical-divider"></div>

      <div className="signup-form">
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
              {/* Reemplazamos <a> por <span> y agregamos un onClick */}
              <span onClick={handleForgotPassword} style={{ cursor: "pointer", color: "#007bff" }}>
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
