import React from "react";
import "./forgot.css"; // CSS que vamos a crear
import formImage from "../../../assets/backgrounds/form.webp";
import { useNavigate } from "react-router-dom"; // Para redirección

const Forgot = () => {
  const navigate = useNavigate(); // Hook de navegación

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí puedes hacer validaciones o llamada a API
    // Si todo está bien, redirige a /verify-code
    navigate("/verify-code"); // Redirige a la página de verificación
  };

  return (
    <div className="forgot-container">
      {/* Lado izquierdo con la imagen */}
      <div className="forgot-image">
        <img src={formImage} alt="Form visual" />
      </div>

      {/* Línea divisoria */}
      <div className="vertical-divider"></div>

      {/* Formulario de recuperación */}
      <div className="forgot-form">
        <div className="form-wrapper">
          <h2>Forgot Password</h2>
          <p>Enter your email to receive a code for password reset.</p>

          <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" required />
            <button type="submit" className="forgot-button">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Forgot;
