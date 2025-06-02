import axios from "axios";
import jwtDecode from "jwt-decode";

const API_URL =
  import.meta.env.VITE_GATEWAY_URL ||
  "https://logistics-backend-n3be.onrender.com";


/**
 * Extrae el userId del token JWT almacenado en localStorage.
 * Retorna el userId (string) o null si no hay token o es inválido.
 */
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

/**
 * Obtiene el estado activo (isActive) del usuario por userId.
 * Envia: header con token.
 * Recibe: objeto con campo isActive: boolean.
 */
export const getUserStatus = async () => {
  const userId = getUserIdFromToken();
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${API_URL}/auth/users/status/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.isActive;
  } catch (error) {
    console.error("Error en getUserStatus:", error.response?.data || error.message);
    return false;
  }
};

/**
 * Obtiene todos los usuarios.
 * Envia: header con token.
 * Recibe: array de usuarios con campos:
 * {
 *   id: string,
 *   roleId: string,
 *   email: string,
 *   name: string,
 *   lastName: string,
 *   phone: string,
 *   isActive: boolean,
 *   ...
 * }
 */
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

/**
 * Obtiene los permisos asignados a un usuario.
 * Envia: header con token.
 * Recibe: objeto con campo permissions: array de permisos (strings o ids).
 */
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

/**
 * Actualiza un usuario por id.
 * Envia: header con token y body con campos a actualizar:
 * {
 *   name: string,
 *   lastName: string,
 *   phone: string,
 *   roleId: string,
 *   isActive: boolean
 * }
 * Recibe: objeto con usuario actualizado.
 */
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
        isActive: updatedData.isActive,
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

/**
 * Elimina un usuario por id.
 * Envia: header con token.
 * Recibe: objeto con confirmación.
 */
export const deleteUser = async (userId) => {
  try {
    const token = localStorage.getItem("token"); 
    
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

/**
 * Crea un nuevo usuario.
 * Envia: header con token y body con:
 * {
 *   name: string,
 *   lastName: string,
 *   email: string,
 *   password: string,
 *   phone: string,
 *   roleId: string
 * }
 * Recibe: objeto con usuario creado:
 * {
 *   id: string,
 *   roleId: string,
 *   email: string,
 *   name: string,
 *   lastName: string,
 *   phone: string,
 *   ...
 * }
 */
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

/**
 * Obtiene un usuario por id.
 * Envia: header con token.
 * Recibe: objeto usuario con campos:
 * {
 *   id: string,
 *   roleId: string,
 *   email: string,
 *   name: string,
 *   lastName: string,
 *   phone: string,
 *   ...
 * }
 */
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
};

/**
 * Obtiene el deliveryId asociado a un userId (repartidor).
 * Envia: header con token.
 * Recibe: objeto con deliveryId u otros datos relacionados.
 */
export const getDeliveryId = async (userId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${API_URL}/orders/delivery-persons/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error al obtener el ID de entrega:", error.response?.data || error.message);
    throw error;
  }
};