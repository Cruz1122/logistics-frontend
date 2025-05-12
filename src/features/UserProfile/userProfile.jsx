import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";  // Importar el toast
import "./userProfile.css"; // Asegúrate de importar el CSS correctamente

export default function Account() {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    setShowModal(false);
    toast.success("Logged out successfully!");  // Muestra el toast al cerrar sesión
    navigate("/"); // Redirige al home o login
  };

  const handleResetPassword = () => {
    navigate("/reset-password"); // Redirige a la página de cambio de contraseña
  };

  return (
    <div className="account-page">
      <h1 className="account-header">My Account</h1>
      <button
        onClick={() => setShowModal(true)}
        className="account-button"
      >
        Log Out
      </button>

      {/* Button to reset password */}
      <button
        onClick={handleResetPassword}
        className="reset-button"
      >
        Reset Password
      </button>

      {/* Confirmation modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="text-xl font-semibold mb-4">Log Out?</h2>
            <p className="mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="modal-button cancel"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="modal-button confirm"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
