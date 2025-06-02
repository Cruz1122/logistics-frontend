import axios from "axios";

const API_URL =
  import.meta.env.VITE_GATEWAY_URL ||
  "https://logistics-backend-n3be.onrender.com";


/**
 * Obtener todos los roles.
 * Envia: Header con token JWT.
 * Recibe: Array con estructura:
 * [
 *   {
 *     id: string,
 *     name: string,
 *     description: string
 *   },
 *   ...
 * ]
 */
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

/**
 * Crear un nuevo rol.
 * Envia: Header con token JWT y body con:
 * {
 *   name: string,
 *   description: string
 * }
 * Recibe: Objeto con el rol creado:
 * {
 *   id: string,
 *   name: string,
 *   description: string
 * }
 */
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

/**
 * Editar un rol existente.
 * Envia: Header con token JWT y body con datos actualizados:
 * {
 *   name?: string,
 *   description?: string
 * }
 * Recibe: Objeto con el rol actualizado:
 * {
 *   id: string,
 *   name: string,
 *   description: string
 * }
 */
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

/**
 * Eliminar un rol.
 * Envia: Header con token JWT.
 * Recibe: Objeto con confirmación de eliminación.
 */
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

/**
 * Obtener un rol por su nombre.
 * Envia: Header con token JWT.
 * Recibe: Id del rol (string).
 */
export const getRoleByName = async (name) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${API_URL}/auth/roles/name/${name}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.id;
  } catch (error) {
    console.error(
      "Error en getRoleByName:",
      error.response?.data || error.message
    );
    throw error;
  }
};