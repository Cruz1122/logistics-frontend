import axios from "axios";

const API_URL =
  import.meta.env.VITE_GATEWAY_URL ||
  "https://logistics-backend-n3be.onrender.com";

console.log(`API_URL: ${API_URL}`);

// Obtener todas las relaciones rol-permiso
export const getAllRolPermissions = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `${API_URL}/auth/role-permissions/role-permissions`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error en getAllRolPermissions:",
      error.response?.data || error.message
    );
    return [];
  }
};

// Crear una nueva relación rol-permiso
export const createRolPermission = async (rolPermissionData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${API_URL}/auth/role-permissions`,
      rolPermissionData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error en createRolPermission:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Editar una relación rol-permiso existente
export const updateRolPermission = async (id, rolPermissionData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.put(
      `${API_URL}/auth/role-permissions/${id}`,
      rolPermissionData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error en updateRolPermission:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Eliminar una relación rol-permiso
export const deleteRolPermission = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.delete(
      `${API_URL}/auth/role-permissions/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error en deleteRolPermission:",
      error.response?.data || error.message
    );
    throw error;
  }
};
