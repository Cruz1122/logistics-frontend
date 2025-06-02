import axios from "axios";

const API_URL =
  import.meta.env.VITE_GATEWAY_URL ||
  "https://logistics-backend-n3be.onrender.com";


/**
 * Get all ProductSuppliers.
 * Sends: Header with JWT token.
 * Receives: Array with structure:
 * [
 *   {
 *     id: string,
 *     productId: string,
 *     supplierId: string
 *   },
 *   ...
 * ]
 */
export const getAllProductSuppliers = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/inventory/product-supplier`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error in getAllProductSuppliers:", error.response?.data || error.message);
    return [];
  }
};

/**
 * Create a new ProductSupplier.
 * Sends in the body:
 * {
 *   productId: string,
 *   supplierId: string
 * }
 * Header: Authorization with JWT token.
 * Receives:
 * {
 *   id: string,
 *   productId: string,
 *   supplierId: string
 * }
 */
export const createProductSupplier = async (productSupplierData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/inventory/product-supplier`, productSupplierData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error in createProductSupplier:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Update an existing ProductSupplier.
 * Sends:
 *   id: string (in the URL),
 *   body: {
 *     productId?: string,
 *     supplierId?: string
 *   }
 * Header: Authorization with JWT token.
 * Receives:
 * {
 *   id: string,
 *   productId: string,
 *   supplierId: string
 * }
 */
export const updateProductSupplier = async (id, productSupplierData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(`${API_URL}/inventory/product-supplier/${id}`, productSupplierData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error in updateProductSupplier:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Delete a ProductSupplier by its ID.
 * Sends:
 *   id: string (in the URL)
 * Header: Authorization with JWT token.
 * Receives:
 * {
 *   message: string
 * }
 */
export const deleteProductSupplier = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${API_URL}/inventory/product-supplier/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error in deleteProductSupplier:", error.response?.data || error.message);
    throw error;
  }
};
