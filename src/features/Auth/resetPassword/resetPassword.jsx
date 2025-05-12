import React, { useState } from "react";
import "./resetPassword.css"; // Asegúrate de importar el CSS correctamente
import formImage from "../../../assets/backgrounds/form.webp";
import { useNavigate } from "react-router-dom";
import { resetPasswordRequest, getUserEmail } from "../../../api/auth"; // Asegúrate de importar getUserEmail
import { toast } from "react-toastify";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    currentPassword: "",
    password: "",
    repeatPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.repeatPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      // Llamamos a la función getUserEmail para obtener el email
      const email = await getUserEmail();
      
      if (!email) {
        toast.error("Could not retrieve email.");
        return;
      }

      const payload = {
        email: email,  // Usamos el email obtenido
        password: form.currentPassword,  // Contraseña actual
        newPassword: form.password,  // Nueva contraseña
      };

      // Llamamos a resetPasswordRequest con el payload
      await resetPasswordRequest(payload);

      toast.success("Password reset successfully!");

      navigate("/userProfile"); // Redirige al login después de un reseteo exitoso

    } catch (err) {
      // Si el error es de la contraseña actual no coincide, mostramos el mensaje correspondiente
      if (err.error && err.error.includes("current password is incorrect")) {
        toast.error("Current password is incorrect");
      } else {
        toast.error(err.error || "Password reset failed");
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="reset-password-container">
      <div className="reset-password-image">
        <img src={formImage} alt="Reset Password visual" />
      </div>

      <div className="vertical-divider"></div>

      <div className="reset-password-form">
        <div className="form-wrapper">
          <h2>Reset Password</h2>
          <p>Enter your details to reset your password</p>

          <form onSubmit={handleSubmit}>
            <input
              type="password"
              name="currentPassword"
              placeholder="Current Password"
              value={form.currentPassword}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="New Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="repeatPassword"
              placeholder="Repeat New Password"
              value={form.repeatPassword}
              onChange={handleChange}
              required
            />

            <button type="submit" className="reset-password-button" disabled={loading}>
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
