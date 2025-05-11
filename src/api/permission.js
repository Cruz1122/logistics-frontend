import axios from "axios";

const API_URL =
  import.meta.env.VITE_GATEWAY_URL ||
  "https://logistics-backend-n3be.onrender.com";

console.log(`API_URL: ${API_URL}`);

// Obtener todos los permisos
export const getAllPermissions = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${API_URL}/auth/permissions/permissions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error en getAllPermissions:",
      error.response?.data || error.message
    );
    return [];
  }
};

// Crear un nuevo permiso
export const createPermission = async (permissionData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${API_URL}/auth/permissions`,
      permissionData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error en createPermission:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Editar un permiso existente
export const updatePermission = async (id, permissionData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.put(
      `${API_URL}/auth/permissions/${id}`,
      permissionData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error en updatePermission:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Eliminar un permiso
export const deletePermission = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.delete(`${API_URL}/auth/permissions/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error en deletePermission:",
      error.response?.data || error.message
    );
    throw error;
  }
};
