import React from "react";
import "./verifyCode.css"; // CSS que vamos a crear
import formImage from "../../../assets/backgrounds/form.webp";
import { useNavigate } from "react-router-dom"; // Importamos useNavigate


const verifyCode = () => {
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí puedes agregar validaciones o llamadas a API si es necesario
    navigate("/"); // Redirige a la página de verificación de correo
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
          <h2>Verification Code</h2>
          <p>We’ve sent a 6-digit verification code to your phone via SMS          </p>
          <p>Please enter it below to complete your sign-in</p>

          <form onSubmit={handleSubmit}>

            <input type="text" placeholder="Enter the verification Code" required />


            <button type="submit" className="verify-button">
              Verify
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default verifyCode;
