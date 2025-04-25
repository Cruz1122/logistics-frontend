import React from "react";
import "./verifyEmail.css"; // CSS que vamos a crear
import formImage from "../../../assets/backgrounds/form.webp";
import { useNavigate } from "react-router-dom"; // Importamos useNavigate

const verifyEmail = () => {
    const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    

    setLoading(false);
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
          <h2>Verification Email</h2>
          <p>We’ve sent a 6-digit verification code to your Email          </p>
          <p>Please enter it below to complete your sign up</p>

          <form onSubmit={handleSubmit}>

            <input type="text" placeholder="Enter the verification Code" required />


            <button type="submit" className="verify-button" disabled={loading}>
              Verify
              {loading ? "Verifying..." : "Verify"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default verifyEmail;
