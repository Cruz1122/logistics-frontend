import axios from "axios";

const API_URL =
  import.meta.env.VITE_GATEWAY_URL ||
  "https://logistics-backend-n3be.onrender.com";


/**
 * Gets all registered cities.
 * Sends: Header with JWT token.
 * Receives: Array of city objects.
 * Example:
 * [
 *   { id: "abc123", name: "Medellín", stateId: "123"},
 *   ...
 * ]
 */
export const getAllCities = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/inventory/city`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error in getAllCities:", error.response?.data || error.message);
    return [];
  }
};

/**
 * Creates a new city.
 * Sends:
 * {
 *   name: string,
 *   stateId: string
 * }
 * Header: Authorization with JWT token.
 * Receives:
 * {
 *   id: string,
 *   name: string,
 *   stateId: string,
 * }
 */
export const createCity = async (cityData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/inventory/city`, cityData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error in createCity:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Updates an existing city by ID.
 * Sends:
 *   id: string (in URL),
 *   body: {
 *     name: string,
 *     stateId: string
 *   }
 * Header: Authorization with JWT token.
 * Receives:
 * {
 *   id: string,
 *   name: string,
 *   stateId: string,
 * }
 */
export const updateCity = async (id, cityData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(`${API_URL}/inventory/city/${id}`, cityData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error in updateCity:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Deletes a city by ID.
 * Sends:
 *   id: string (in URL)
 * Header: Authorization with JWT token.
 * Receives:
 * {
 *   message: string
 * }
 */
export const deleteCity = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${API_URL}/inventory/city/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error in deleteCity:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Gets a city by its ID.
 * Sends:
 *   id: string (in URL)
 * Header: Authorization with JWT token.
 * Receives:
 * {
 *   id: string,
 *   name: string,
 *   stateId: string
 * }
 */
export const getCityById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/inventory/city/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error in getCityById:", error.response?.data || error.message);
    throw error;
  }
};
