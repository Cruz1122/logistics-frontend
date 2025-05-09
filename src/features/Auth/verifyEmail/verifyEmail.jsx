import React, { useState } from "react";
import "./verifyEmail.css";
import formImage from "../../../assets/backgrounds/form.webp";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { verifyEmailRequest } from "../../../api/auth";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setCode(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !code) {
      toast.error("Missing email or code");
      return;
    }

    try {
      setLoading(true);
      await verifyEmailRequest({ email, code });
      toast.success("Verification successful!");
      navigate("/signin");
    } catch (err) {
      toast.error("Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verify-container">
      <div className="verify-image">
        <img src={formImage} alt="Form visual" />
      </div>

      <div className="vertical-divider"></div>

      <div className="verify-form">
        <div className="form-wrapper">
          <h2>Verification Email</h2>
          <p>We’ve sent a 6-digit verification code to your email</p>
          <p>Please enter it below to complete your sign-up</p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter the verification code"
              value={code}
              onChange={handleChange}
              maxLength={6}
              inputMode="numeric"
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
