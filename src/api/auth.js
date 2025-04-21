import axios from "axios";

// Lee la variable de entorno o usa una predeterminada
const API_URL =
  import.meta.env.VITE_AUTH_URL ||
  "https://logistics-backend-n3be.onrender.com/auth";

export const signUpRequest = async (userData) => {
  try {
    console.log("API_URL:", API_URL);
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Unknown error" };
  }
};
