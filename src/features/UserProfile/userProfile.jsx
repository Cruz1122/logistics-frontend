import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./userProfile.css";
import { getUserByID, getUserIdFromToken } from "../../api/user";
import { FullScreenLoader } from "../../App";

export default function Account() {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const userId = getUserIdFromToken();
      if (!userId) {
        navigate("/login");
        return;
      }
      const fetchedUser = await getUserByID(userId);
      if (!fetchedUser) {
        navigate("/login");
        return;
      }
      setUser(fetchedUser);
    };

    fetchUser();
  }, [navigate]);

  if (!user) {
    return <FullScreenLoader />;
  }

  const handleLogout = () => {
    dispatch(logoutUser());
    setShowModal(false);
    toast.success("Logged out successfully!");
    navigate("/");
  };

  const handleResetPassword = () => {
    navigate("/reset-password");
  };

  return (
    <div className="account-page">
      <h1 className="account-header">My Account</h1>

      <div className="user-info-card">
        <div className="user-info-header">
          <img
            src={user.avatarUrl || "/default-avatar.png"}
            alt={`${user.name} ${user.lastName}`}
            className="user-avatar"
          />
          <div className="user-name-role">
            <h2>
              {user.name} {user.lastName}
            </h2>
            <p>{user.role?.name || "Guest"}</p>
          </div>
        </div>

        <div className="user-info-details">
          <div className="user-info-row">
            <span className="label">Email:</span>
            <span>{user.email}</span>
          </div>
          <div className="user-info-row">
            <span className="label">Phone:</span>
            <span>{user.phone || "N/A"}</span>
          </div>
          <div className="user-info-row">
            <span className="label">City:</span>
            <span>{user.cityId || "Not specified"}</span>
          </div>
        </div>
      </div>

      <div className="buttons-container">
        <button
          onClick={() => setShowModal(true)}
          className="main-button logout-button"
          aria-label="Log Out"
        >
          Log Out
        </button>

        <button
          onClick={handleResetPassword}
          className="main-button reset-button"
          aria-label="Reset Password"
        >
          Reset Password
        </button>
      </div>

      {showModal && (
        <div className="modal-overlay" aria-modal="true">
          <div className="modal-content">
            <h2>Log Out?</h2>
            <p>Are you sure you want to log out?</p>
            <div className="modal-buttons">
              <button
                onClick={() => setShowModal(false)}
                className="modal-button cancel"
              >
                Cancel
              </button>
              <button onClick={handleLogout} className="modal-button confirm">
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
