import axios from "axios";

const API_URL =
  import.meta.env.VITE_GATEWAY_URL ||
  "https://logistics-backend-n3be.onrender.com";

console.log(`API_URL: ${API_URL}`);
  
export const signUpRequest = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/auth/signup`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Unknown error" };
  }
};

export const signInRequest = async (loginData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/auth/signin`, loginData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Unknown error" };
  }
};

// Nueva función para verificación de código
export const verifyCodeRequest = async ({ email, code }) => {
  try {
    // Hacemos la solicitud POST para verificar el código de 2FA
    const response = await axios.post(`${API_URL}/auth/auth/verify-two-factor`, {
      email,
      code,
    });

    // Si la respuesta contiene un token, lo almacenamos en el localStorage
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }

    // Devolvemos los datos de la respuesta
    return response.data;

  } catch (error) {
    // Si ocurre un error, lanzamos un error con la respuesta o un mensaje por defecto
    throw error.response?.data || { error: "Unknown error" };
  }
};

export const verifyEmailRequest = async ({ email, code }) => {
  const response = await axios.post(`${API_URL}/auth/auth/verify-email`, {
    email,
    code,
  });
  return response.data;
};

export const forgotPasswordRequest = async ({ email }) => {
  const response = await axios.post(`${API_URL}/auth/auth/request-password-reset`, {
    email
  });
  return response.data;
};

export const verifyCodeAndUpdatePassword = async ({ email, code, newPassword }) => {
  const response = await axios.post(`${API_URL}/auth/auth/reset-password`, {
    email, // Usamos el email extraído de la navegación
    code,
    newPassword,
  });
  return response.data;
};