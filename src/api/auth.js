import axios from "axios";
import jwtDecode from 'jwt-decode';

const API_URL =
  import.meta.env.VITE_GATEWAY_URL ||
  "https://logistics-backend-n3be.onrender.com";

console.log(`API_URL: ${API_URL}`);

/**
 * Obtiene el email del usuario autenticado.
 * Envia: token JWT en el header.
 * Recibe: { email: string }
 */
export const getUserEmail = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    const userId = decoded.userId; // Extraemos el userId del token

    const response = await axios.get(`${API_URL}/auth/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Enviamos el token en el header
      },
    });

    return response.data.email || null;
  } catch (err) {
    console.error("Error obteniendo el email del usuario:", err);
    return null;
  }
};

/**
 * Extrae el roleId del token almacenado.
 * Envia: token JWT en localStorage.
 * Recibe: string | null
 */
export const getUserRolId = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.roleId || null; 
  } catch (err) {
    console.error("Token inválido:", err);
    return null;
  }
};

/**
 * Crea un nuevo usuario.
 * Envia:
 * {
 *   name: string,
 *   email: string,
 *   password: string,
 *   phone: string,
 *   roleId: string,
 *   cityId: string,
 *   ... // otros campos necesarios
 * }
 * Recibe:
 * {
 *   message: string,
 *   user: { id, email, ... }
 * }
 */
export const signUpRequest = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/auth/signup`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Unknown error" };
  }
};

/**
 * Reenvía el código de autenticación 2FA.
 * Envia: { email: string, method: "sms" | "email" }
 * Recibe: { message: string }
 */
export const resendTwoFA = async (email, method) => {
  try {
    const response = await axios.post(`${API_URL}/auth/auth/resend-two-factor`, { email, method });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Unknown error" };
  }
};

/**
 * Inicia sesión con email y password.
 * Envia: { email: string, password: string }
 * Recibe: { message: string, method: "sms" | "email" }
 */
export const signInRequest = async (loginData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/auth/signin`, loginData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Unknown error" };
  }
};

/**
 * Verifica el código de autenticación 2FA.
 * Envia: { email: string, code: string }
 * Recibe: { token: string, user: { id, email, ... } }
 * Guarda el token en localStorage si es válido.
 */
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

/**
 * Verifica el email del usuario con un código.
 * Envia: { email: string, code: string }
 * Recibe: { message: string }
 */
export const verifyEmailRequest = async ({ email, code }) => {
  const response = await axios.post(`${API_URL}/auth/auth/verify-email`, {
    email,
    code,
  });
  return response.data;
};

/**
 * Solicita código para restablecer contraseña.
 * Envia: { email: string }
 * Recibe: { message: string }
 */
export const forgotPasswordRequest = async ({ email }) => {
  const response = await axios.post(`${API_URL}/auth/auth/request-password-reset`, {
    email
  });
  return response.data;
};

/**
 * Verifica código y cambia la contraseña.
 * Envia: { email: string, code: string, newPassword: string }
 * Recibe: { message: string }
 */
export const verifyCodeAndUpdatePassword = async ({ email, code, newPassword }) => {
  const response = await axios.post(`${API_URL}/auth/auth/reset-password`, {
    email,
    code,
    newPassword,
  });
  return response.data;
};

/**
 * Obtiene los datos de un usuario por ID.
 * Envia: id de usuario
 * Recibe: { id, email, name, roleId, ... }
 */
export const getUserRequest = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/auth/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Unknown error" };
  }
};

/**
 * Cambia la contraseña desde la cuenta autenticada.
 * Envia:
 * {
 *   email: string,
 *   password: string,        // contraseña actual
 *   newPassword: string      // nueva contraseña
 * }
 * Header: Authorization: Bearer <token>
 * Recibe: { message: string }
 */
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
