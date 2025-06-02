import React, { useState } from "react";
import "./verifyCode.css";
import formImage from "../../../assets/backgrounds/form.webp";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import {
  setAuthenticated,
  setUser,
  setLoading,
} from "../../../redux/authSlice";
import { useDispatch } from "react-redux";
import {
  getUserRolId,
  verifyCodeRequest,
  resendTwoFA, // <-- Importada aquí
} from "../../../api/auth";
import {
  getUserIdFromToken,
  getUserPermissions,
  getUserStatus,
} from "../../../api/user";

const VerifyCode = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const email = location.state?.email;
  const method = location.state?.method || "email";
  const [code, setCode] = useState("");
  const [loading, setLoadingPage] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setCode(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Missing email for verification");
      return;
    }

    dispatch(setLoading(true));
    try {
      setLoadingPage(true);
      const response = await verifyCodeRequest({ email, code });

      if (response.token) {
        const rolId = await getUserRolId();
        const userId = getUserIdFromToken();
        const permissions = await getUserPermissions(userId);

        if (!rolId || !permissions) {
          toast.error("Error obteniendo rol de usuario o permisos");
          dispatch(setAuthenticated(false));
          dispatch(setUser({ token: null }));
          console.log("[VerifyCode] Error: rolId or permissions not found");
          return;
        }

        console.log("[VerifyCode] rolId:", rolId);
        console.log("[VerifyCode] permissions:", permissions);

        dispatch(setUser({ token: response.token, rolId, permissions }));
        dispatch(setAuthenticated(true));

        const isActive = await getUserStatus();
        if (!isActive) {
          toast.error("User is inactive");
          navigate("/inactive");
          return;
        }

        toast.success("Verification successful!");
        navigate("/");
      } else {
        toast.error(response.message || "Login failed");
        dispatch(setAuthenticated(false));
      }
    } catch (err) {
      toast.error(err.error || "Verification failed");
      dispatch(setAuthenticated(false));
    } finally {
      setLoadingPage(false);
      dispatch(setLoading(false));
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      toast.error("Missing email for verification");
      return;
    }

    try {
      setLoadingPage(true);
      const response = await resendTwoFA(email, method);

      if (response.email) {
        toast.success("Verification code resent successfully!");
      } else {
        toast.error(response.message || "Failed to resend code.");
      }
    } catch (err) {
      toast.error("An error occurred while resending the code.");
    } finally {
      setLoadingPage(false);
    }
  };

  const message =
    method === "sms"
      ? "We’ve sent a 6-digit verification code to your phone via SMS"
      : "We’ve sent a 6-digit verification code to your email address";

  return (
    <div className="verify-container">
      <div className="verify-image">
        <img src={formImage} alt="Form visual" />
      </div>

      <div className="vertical-divider"></div>

      <div className="verify-form">
        <div className="form-wrapper">
          <h2>Verification Code</h2>
          <p>{message}</p>
          <p>Please enter it below to complete your sign-in</p>

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
            <button
              type="button"
              className="verify-button resend-button"
              onClick={handleResendCode}
              disabled={loading}
            >
              {loading ? "Sending..." : "Resend Code"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;
