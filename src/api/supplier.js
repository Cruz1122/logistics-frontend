import axios from "axios";

const API_URL =
  import.meta.env.VITE_GATEWAY_URL ||
  "https://logistics-backend-n3be.onrender.com";


/**
 * Get all suppliers.
 * Sends: Header with JWT token.
 * Receives: Array with structure:
 * [
 *   {
 *     id: string,
 *     name: string,
 *     phone: string,
 *     email: string
 *   },
 *   ...
 * ]
 */
export const getAllSuppliers = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/inventory/supplier`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error in getAllSuppliers:",
      error.response?.data || error.message
    );
    return [];
  }
};

/**
 * Create a new supplier.
 * Sends: Header with JWT token and body with:
 * {
 *   name: string,
 *   phone: string,
 *   email: string
 * }
 * Receives: Object with the created supplier:
 * {
 *   id: string,
 *   name: string,
 *   phone: string,
 *   email: string
 * }
 */
export const createSupplier = async (supplierData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${API_URL}/inventory/supplier`,
      supplierData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error in createSupplier:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * Edit an existing supplier.
 * Sends: Header with JWT token and body with:
 * {
 *   name: string,
 *   phone: string,
 *   email: string
 * }
 * Receives: Object with the updated supplier:
 * {
 *   id: string,
 *   name: string,
 *   phone: string,
 *   email: string
 * }
 */
export const updateSupplier = async (id, supplierData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${API_URL}/inventory/supplier/${id}`,
      supplierData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error in updateSupplier:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * Delete a supplier.
 * Sends: Header with JWT token.
 * Receives: Object with deletion confirmation.
 */
export const deleteSupplier = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${API_URL}/inventory/supplier/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error in deleteSupplier:",
      error.response?.data || error.message
    );
    throw error;
  }
};
