import axios from "axios";

const API_URL =
  import.meta.env.VITE_GATEWAY_URL ||
  "https://logistics-backend-n3be.onrender.com";


/**
 * Get all permissions.
 * Sends: Header with JWT token.
 * Receives: Array of permissions with the following structure:
 * [
 *   {
 *     id: string,
 *     name: string,
 *     description: string
 *   },
 *   ...
 * ]
 */
export const getAllPermissions = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${API_URL}/auth/permissions/permissions`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error in getAllPermissions:",
      error.response?.data || error.message
    );
    return [];
  }
};

/**
 * Create a new permission.
 * Sends in the body:
 * {
 *   name: string,
 *   description: string
 * }
 * Header: Authorization with JWT token.
 * Receives:
 * {
 *   id: string,
 *   name: string,
 *   description: string
 * }
 */
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
      "Error in createPermission:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * Edit an existing permission.
 * Sends:
 *   id: string (in the URL),
 *   body: {
 *     name?: string,
 *     description?: string
 *   }
 * Header: Authorization with JWT token.
 * Receives:
 * {
 *   id: string,
 *   name: string,
 *   description: string
 * }
 */
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
      "Error in updatePermission:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * Delete a permission by its ID.
 * Sends:
 *   id: string (in the URL)
 * Header: Authorization with JWT token.
 * Receives:
 * {
 *   message: string
 * }
 */
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
      "Error in deletePermission:",
      error.response?.data || error.message
    );
    throw error;
  }
};
