import axios from "axios";
import jwtDecode from "jwt-decode";

const API_URL =
  import.meta.env.VITE_GATEWAY_URL ||
  "https://logistics-backend-n3be.onrender.com";


/**
 * Extracts the userId from the JWT token stored in localStorage.
 * Returns the userId (string) or null if there is no token or it is invalid.
 */
export const getUserIdFromToken = () => {
  const token = localStorage.getItem("token");

  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.userId || null; 
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
};

/**
 * Gets the active status (isActive) of the user by userId.
 * Sends: header with token.
 * Receives: object with field isActive: boolean.
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
    console.error("Error in getUserStatus:", error.response?.data || error.message);
    return false;
  }
};

/**
 * Gets all users.
 * Sends: header with token.
 * Receives: array of users with fields:
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
    console.error("Error in getAllUsers:", error.response?.data || error.message);
    return [];
  }
};

/**
 * Gets the permissions assigned to a user.
 * Sends: header with token.
 * Receives: object with field permissions: array of permissions (strings or ids).
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
 * Updates a user by id.
 * Sends: header with token and body with fields to update:
 * {
 *   name: string,
 *   lastName: string,
 *   phone: string,
 *   roleId: string,
 *   isActive: boolean
 * }
 * Receives: object with updated user.
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
    console.error("Error updating user:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Deletes a user by id.
 * Sends: header with token.
 * Receives: object with confirmation.
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
 * Creates a new user.
 * Sends: header with token and body with:
 * {
 *   name: string,
 *   lastName: string,
 *   email: string,
 *   password: string,
 *   phone: string,
 *   roleId: string
 * }
 * Receives: object with created user:
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
    console.log(userData);
    
    const response = await axios.post(
      `${API_URL}/auth/users`,
      {
        name: userData.name,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
        phone: userData.phone,
        roleId: userData.roleId,
        cityId: userData.cityId
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error creating user:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Gets a user by id.
 * Sends: header with token.
 * Receives: user object with fields:
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
    console.error("Error getting user:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Gets the deliveryId associated with a userId (delivery person).
 * Sends: header with token.
 * Receives: object with deliveryId or other related data.
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
    console.error("Error getting delivery ID:", error.response?.data || error.message);
    throw error;
  }
};