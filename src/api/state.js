import axios from "axios";

const API_URL =
  import.meta.env.VITE_GATEWAY_URL ||
  "https://logistics-backend-n3be.onrender.com";


/**
 * Get all states.
 * Sends: Header with JWT token.
 * Receives: Array with structure:
 * [
 *   {
 *     id: string,
 *     name: string
 *   },
 *   ...
 * ]
 */
export const getAllStates = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/inventory/state`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error in getAllStates:",
      error.response?.data || error.message
    );
    return [];
  }
};

/**
 * Create a new state.
 * Sends: Header with JWT token and body with:
 * {
 *   name: string
 * }
 * Receives: Object with the created state:
 * {
 *   id: string,
 *   name: string
 * }
 */
export const createState = async (stateData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${API_URL}/inventory/state`,
      stateData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error in createState:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * Edit an existing state.
 * Sends: Header with JWT token and body with:
 * {
 *   name: string
 * }
 * Receives: Object with the updated state:
 * {
 *   id: string,
 *   name: string
 * }
 */
export const updateState = async (id, stateData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${API_URL}/inventory/state/${id}`,
      stateData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error in updateState:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * Delete a state.
 * Sends: Header with JWT token.
 * Receives: Object with deletion confirmation.
 */
export const deleteState = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${API_URL}/inventory/state/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error in deleteState:",
      error.response?.data || error.message
    );
    throw error;
  }
};
