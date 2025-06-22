import React, { useState } from "react";
import "./signIn.css";
import formImage from "../../../assets/backgrounds/form.webp";
import { useNavigate } from "react-router-dom";
import { signInRequest } from "../../../api/auth";
import { toast } from "react-toastify";

const SignIn = () => {
  const navigate = useNavigate();
  const [show2FAMethodModal, setShow2FAMethodModal] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [loading2FA, setLoading2FA] = useState(false); // Estado para deshabilitar los botones 2FA

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShow2FAMethodModal(true);
  };

  const handle2FASelection = async (method) => {
    const payload = {
      email: form.email,
      password: form.password,
      method: method, // "email" o "sms"
    };

    try {
      setLoading(true);
      setLoading2FA(true); // Deshabilitar botones 2FA
      await signInRequest(payload);
      toast.success("2FA code sent!");
      navigate("/verify-code", {
        state: {
          email: form.email,
          method: method,
          fromFlow: true
        },
      });
    } catch (err) {
      toast.error(err.error || "Login failed");
    } finally {
      setLoading(false);
      setLoading2FA(false); // Volver a habilitar botones 2FA
      setShow2FAMethodModal(false);
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot");
  };

  const closeModal = () => {
    setShow2FAMethodModal(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target.className === "modal-overlay") {
      closeModal();
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-image">
        <img src={formImage} alt="Login visual" />
      </div>

      <div className="vertical-divider"></div>

      <div className="signin-form">
        <div className="form-wrapper">
          <h2>Login</h2>
          <p>Sign in to continue</p>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <button type="submit" className="signin-button" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <div className="forgot-password">
              <span onClick={handleForgotPassword}>Forgot your password?</span>
            </div>
          </form>
        </div>
      </div>

      {show2FAMethodModal && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="modal-content">
            <h3>Select 2FA Method</h3>
            <button
              onClick={() => handle2FASelection("email")}
              disabled={loading2FA} // Deshabilitar el botón si se está procesando
            >
              Email
            </button>
            <button
              onClick={() => handle2FASelection("sms")}
              disabled={loading2FA} // Deshabilitar el botón si se está procesando
            >
              SMS
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignIn;
