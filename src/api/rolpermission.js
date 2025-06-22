import axios from "axios";

const API_URL =
  import.meta.env.VITE_GATEWAY_URL ||
  "https://logistics-backend-n3be.onrender.com";


/**
 * Get all role-permission relations.
 * Sends: Header with JWT token.
 * Receives: Array with structure:
 * [
 *   {
 *     id: string,
 *     roleId: string,
 *     permissionId: string,
 *     list: boolean,
 *     delete: boolean,
 *     create: boolean,
 *     edit: boolean,
 *     download: boolean
 *   },
 *   ...
 * ]
 */
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
      "Error in getAllRolPermissions:",
      error.response?.data || error.message
    );
    return [];
  }
};

/**
 * Create a new role-permission relation.
 * Sends: Header with JWT token and body with:
 * {
 *   roleId: string,
 *   permissionId: string,
 *   list: boolean,
 *   delete: boolean,
 *   create: boolean,
 *   edit: boolean,
 *   download: boolean
 * }
 * Receives: Object with the created relation:
 * {
 *   id: string,
 *   roleId: string,
 *   permissionId: string,
 *   list: boolean,
 *   delete: boolean,
 *   create: boolean,
 *   edit: boolean,
 *   download: boolean
 * }
 */
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
      "Error in createRolPermission:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * Edit an existing role-permission relation.
 * Sends: Header with JWT token and body with updated data:
 * {
 *   roleId?: string,
 *   permissionId?: string,
 *   list?: boolean,
 *   delete?: boolean,
 *   create?: boolean,
 *   edit?: boolean,
 *   download?: boolean
 * }
 * Receives: Object with the updated relation:
 * {
 *   id: string,
 *   roleId: string,
 *   permissionId: string,
 *   list: boolean,
 *   delete: boolean,
 *   create: boolean,
 *   edit: boolean,
 *   download: boolean
 * }
 */
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
      "Error in updateRolPermission:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * Delete a role-permission relation.
 * Sends: Header with JWT token.
 * Receives: Object with deletion confirmation.
 */
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
      "Error in deleteRolPermission:",
      error.response?.data || error.message
    );
    throw error;
  }
};
