import axios from "axios";
import jwtDecode from "jwt-decode";

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

export const updateUser = async (userId, updatedData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.put(
      `${API_URL}/auth/users/${userId}`,
      {
        name: updatedData.name,
        lastName: updatedData.lastName,
        phone: updatedData.phone,
        roleId: updatedData.roleId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error al actualizar usuario:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const token = localStorage.getItem("token"); 
    console.log("UserID to delete: ",userId);
    
    const response = await axios.delete(`${API_URL}/auth/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Failed to delete user");
  }
};

export const createUser = async (userData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${API_URL}/auth/users`,
      {
        name: userData.name,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
        phone: userData.phone,
        roleId: userData.roleId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error al crear usuario:", error.response?.data || error.message);
    throw error;
  }
};

export const getUserByID = async (userId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${API_URL}/auth/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error al obtener usuario:", error.response?.data || error.message);
    throw error;
  }
}