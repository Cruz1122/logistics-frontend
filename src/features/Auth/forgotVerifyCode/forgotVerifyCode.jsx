import React, { useState } from "react";
import "./forgotVerifyCode.css";
import formImage from "../../../assets/backgrounds/form.webp";
import { useNavigate, useLocation } from "react-router-dom"; // Para redirección y estado
import { toast } from "react-toastify"; // Para mostrar notificaciones
import { verifyCodeAndUpdatePassword } from "../../../api/auth"; // Función para la llamada a la API

const ForgotVerifyCode = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Para acceder al estado pasado en la navegación
  const { email } = location.state || {}; // Extraer el email

  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [loading, setLoading] = useState(false); // Estado de carga para el botón

  // Expresión regular para validar la contraseña (similar a la de SignUp)
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de contraseñas
    if (!passwordRegex.test(newPassword)) {
      toast.warn(
        "Password must be at least 6 characters, include uppercase, lowercase, number and special character"
      );
      return;
    }

    if (newPassword !== repeatPassword) {
      toast.error("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true); // Activar estado de carga

    // Preparar datos para enviar
    const payload = {
      email: email, // Usamos el email extraído de la navegación
      code: code,
      newPassword: newPassword,
    };

    try {
      await verifyCodeAndUpdatePassword(payload);
      toast.success("Contraseña actualizada con éxito.");
      navigate("/signin"); // Redirige al inicio de sesión
    } catch (err) {
      toast.error(err.error || "Error al actualizar la contraseña.");
    } finally {
      setLoading(false); // Desactivar estado de carga
    }
  };

  return (
    <div className="forgot-container">
      <div className="forgot-image">
        <img src={formImage} alt="Form visual" />
      </div>
      <div className="vertical-divider"></div>
      <div className="forgot-form">
        <div className="form-wrapper">
          <h2>Verify Code and Reset Password</h2>
          <p>Enter the verification code and your new password.</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Verification Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Repeat New Password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
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

export default ForgotVerifyCode;
