import React, { useState } from "react";
import "./forgot.css"; // CSS que vamos a crear
import formImage from "../../../assets/backgrounds/form.webp";
import { useNavigate } from "react-router-dom"; // Para redirección
import { forgotPasswordRequest } from "../../../api/auth"; // La función para la llamada a la API
import { toast } from "react-toastify"; // Para notificaciones

const Forgot = () => {
  const navigate = useNavigate(); // Hook de navegación
  const [email, setEmail] = useState(""); // Estado para el email
  const [loading, setLoading] = useState(false); // Estado de carga

  // Maneja el cambio del campo de entrada de email
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required");
      return;
    }

    setLoading(true); // Empieza el estado de carga

    const payload = {
      email: email,
    };

    try {
      await forgotPasswordRequest(payload); // Llamada a la API para recuperar la contraseña
      toast.success("Verification code sent to your email!"); // Notificación de éxito
      navigate("/forgot-verify-code", { state: { email: email, fromFlow: true } }); // Redirige a la página de verificación de código
    } catch (err) {
      toast.error(err.error || "Failed to send verification code"); // Muestra un error si algo sale mal
    } finally {
      setLoading(false); // Finaliza el estado de carga
    }
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
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleChange}
              required
            />
            <button type="submit" className="forgot-button" disabled={loading}>
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Forgot;
