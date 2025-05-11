import axios from "axios";
import { jwtDecode } from "jwt-decode";


const API_URL =
  import.meta.env.VITE_GATEWAY_URL ||
  "https://logistics-backend-n3be.onrender.com";

console.log(`API_URL: ${API_URL}`);

export const getUserIdFromToken = () => {
  const token = localStorage.getItem("token");

  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.userId || null; 
  } catch (err) {
    console.error("Token inválido:", err);
    return null;
  }
};

export const getAllUsers = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${API_URL}/auth/users/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error en getAllUsers:", error.response?.data || error.message);
    return [];
  }
};

export const getUserPermissions = async (userId) => {
  try {
    const token = localStorage.getItem("token");
    
    const response = await axios.get(`${API_URL}/auth/auth/users/${userId}/permissions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    return response.data.permissions;
  } catch (error) {
    console.error("Error fetching permissions:", error.message);
    return [];
  }
};