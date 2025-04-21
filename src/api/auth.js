import axios from "axios";

const API_URL = import.meta.env.VITE_AUTH_URL; // Asegúrate que en tu .env esté como VITE_

export const signUpRequest = async (userData) => {
  try {
    console.log("API_URL:", API_URL);
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Unknown error" };
  }
};
