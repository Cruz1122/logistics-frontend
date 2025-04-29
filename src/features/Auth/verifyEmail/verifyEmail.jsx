import React, { useState } from "react";
import "./verifyEmail.css";
import formImage from "../../../assets/backgrounds/form.webp";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 1000); // Le metí un pequeño setTimeout para simular proceso de verificación
  };

  return (
    <div className="verify-container">
      {/* Lado izquierdo con la imagen */}
      <div className="verify-image">
        <img src={formImage} alt="Form visual" />
      </div>

      {/* Línea divisoria */}
      <div className="vertical-divider"></div>

      {/* Formulario de verificación */}
      <div className="verify-form">
        <div className="form-wrapper">
          <h2>Verification Email</h2>
          <p>We’ve sent a 6-digit verification code to your Email</p>
          <p>Please enter it below to complete your sign up</p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter the verification code"
              required
            />
            <button type="submit" className="verify-button" disabled={loading}>
              {loading ? "Verifying..." : "Verify"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
