import axios from "axios";

const API_URL =
  import.meta.env.VITE_GATEWAY_URL ||
  "https://logistics-backend-n3be.onrender.com";


/**
 * Get all roles.
 * Sends: Header with JWT token.
 * Receives: Array with structure:
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
      "Error in getAllRoles:",
      error.response?.data || error.message
    );
    return [];
  }
};

/**
 * Create a new role.
 * Sends: Header with JWT token and body with:
 * {
 *   name: string,
 *   description: string
 * }
 * Receives: Object with the created role:
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
      "Error in createRole:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * Edit an existing role.
 * Sends: Header with JWT token and body with updated data:
 * {
 *   name?: string,
 *   description?: string
 * }
 * Receives: Object with the updated role:
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
      "Error in updateRole:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * Delete a role.
 * Sends: Header with JWT token.
 * Receives: Object with deletion confirmation.
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
      "Error in deleteRole:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * Get a role by its name.
 * Sends: Header with JWT token.
 * Receives: Role id (string).
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
      "Error in getRoleByName:",
      error.response?.data || error.message
    );
    throw error;
  }
};