import axios from "axios";

const API_URL =
  import.meta.env.VITE_GATEWAY_URL ||
  "https://logistics-backend-n3be.onrender.com";

console.log(`API_URL: ${API_URL}`);

// Obtener todos los roles
export const getAllRoles = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${API_URL}/auth/roles/roles`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error en getAllRoles:",
      error.response?.data || error.message
    );
    return [];
  }
};

// Crear un nuevo rol
export const createRole = async (roleData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(`${API_URL}/auth/roles`, roleData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error en createRole:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Editar un rol existente
export const updateRole = async (id, roleData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.put(`${API_URL}/auth/roles/${id}`, roleData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error en updateRole:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Eliminar un rol
export const deleteRole = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.delete(`${API_URL}/auth/roles/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error en deleteRole:",
      error.response?.data || error.message
    );
    throw error;
  }
};
