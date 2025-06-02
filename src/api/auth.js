import axios from "axios";
import jwtDecode from 'jwt-decode';

const API_URL =
  import.meta.env.VITE_GATEWAY_URL ||
  "https://logistics-backend-n3be.onrender.com";

// Gets the authenticated user's email.
// Sends: JWT token in the header.
// Receives: { email: string }
export const getUserEmail = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    const userId = decoded.userId; // Extract userId from token

    const response = await axios.get(`${API_URL}/auth/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Send token in header
      },
    });

    return response.data.email || null;
  } catch (err) {
    console.error("Error getting user email:", err);
    return null;
  }
};

// Extracts the roleId from the stored token.
// Sends: JWT token in localStorage.
// Receives: string | null
export const getUserRolId = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.roleId || null; 
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
};

// Creates a new user.
// Sends:
// {
//   name: string,
//   email: string,
//   password: string,
//   phone: string,
//   roleId: string,
//   cityId: string,
//   ... // other required fields
// }
// Receives:
// {
//   message: string,
//   user: { id, email, ... }
// }
export const signUpRequest = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/auth/signup`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Unknown error" };
  }
};

// Resends the 2FA authentication code.
// Sends: { email: string, method: "sms" | "email" }
// Receives: { message: string }
export const resendTwoFA = async (email, method) => {
  try {
    const response = await axios.post(`${API_URL}/auth/auth/resend-two-factor`, { email, method });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Unknown error" };
  }
};

// Signs in with email and password.
// Sends: { email: string, password: string }
// Receives: { message: string, method: "sms" | "email" }
export const signInRequest = async (loginData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/auth/signin`, loginData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Unknown error" };
  }
};

// Verifies the 2FA authentication code.
// Sends: { email: string, code: string }
// Receives: { token: string, user: { id, email, ... } }
// Stores the token in localStorage if valid.
export const verifyCodeRequest = async ({ email, code }) => {
  try {
    const response = await axios.post(`${API_URL}/auth/auth/verify-two-factor`, {
      email,
      code,
    });

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }

    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Unknown error" };
  }
};

// Verifies the user's email with a code.
// Sends: { email: string, code: string }
// Receives: { message: string }
export const verifyEmailRequest = async ({ email, code }) => {
  const response = await axios.post(`${API_URL}/auth/auth/verify-email`, {
    email,
    code,
  });
  return response.data;
};

// Requests a code to reset password.
// Sends: { email: string }
// Receives: { message: string }
export const forgotPasswordRequest = async ({ email }) => {
  const response = await axios.post(`${API_URL}/auth/auth/request-password-reset`, {
    email
  });
  return response.data;
};

// Verifies code and changes the password.
// Sends: { email: string, code: string, newPassword: string }
// Receives: { message: string }
export const verifyCodeAndUpdatePassword = async ({ email, code, newPassword }) => {
  const response = await axios.post(`${API_URL}/auth/auth/reset-password`, {
    email,
    code,
    newPassword,
  });
  return response.data;
};

// Gets user data by ID.
// Sends: user ID
// Receives: { id, email, name, roleId, ... }
export const getUserRequest = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/auth/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Unknown error" };
  }
};

// Changes the password from the authenticated account.
// Sends:
// {
//   email: string,
//   password: string,        // current password
//   newPassword: string      // new password
// }
// Header: Authorization: Bearer <token>
// Receives: { message: string }
export const resetPasswordRequest = async ({ email, password, newPassword }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw { error: "Token not found, please log in again." };
  }

  try {
    const response = await axios.patch(
      `${API_URL}/auth/auth/change-password`,
      { email, password, newPassword },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Unknown error" };
  }
};
