import axios from "axios";

const API_URL =
  import.meta.env.VITE_GATEWAY_URL ||
  "https://logistics-backend-n3be.onrender.com";


/**
 * Get all products.
 * Sends: Header with JWT token.
 * Receives: Array of products with structure:
 * [
 *   {
 *     id: string,
 *     categoryId: string,
 *     name: string,
 *     description: string,
 *     sku: string,
 *     barcode: string,
 *     unitPrice: number,
 *     weightKg: number,
 *     dimensions: string,
 *     isFragile: boolean,
 *     needsCooling: boolean
 *   },
 *   ...
 * ]
 */
export const getAllProducts = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/inventory/product`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error in getAllProducts:", error.response?.data || error.message);
    return [];
  }
};

/**
 * Create a new product.
 * Sends in the body:
 * {
 *   categoryId: string,
 *   name: string,
 *   description: string,
 *   sku: string,
 *   barcode: string,
 *   unitPrice: number,
 *   weightKg: number,
 *   dimensions: string,
 *   isFragile: boolean,
 *   needsCooling: boolean
 * }
 * Header: Authorization with JWT token.
 * Receives:
 * {
 *   id: string,
 *   ...other sent fields
 * }
 */
export const createProduct = async (productData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/inventory/product`, productData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error in createProduct:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Update an existing product.
 * Sends:
 *   id: string (in the URL),
 *   body: {
 *     categoryId?: string,
 *     name?: string,
 *     description?: string,
 *     sku?: string,
 *     barcode?: string,
 *     unitPrice?: number,
 *     weightKg?: number,
 *     dimensions?: string,
 *     isFragile?: boolean,
 *     needsCooling?: boolean
 *   }
 * Header: Authorization with JWT token.
 * Receives:
 * {
 *   id: string,
 *   ...updated fields
 * }
 */
export const updateProduct = async (id, productData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(`${API_URL}/inventory/product/${id}`, productData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error in updateProduct:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Delete a product by its ID.
 * Sends:
 *   id: string (in the URL)
 * Header: Authorization with JWT token.
 * Receives:
 * {
 *   message: string
 * }
 */
export const deleteProduct = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${API_URL}/inventory/product/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error in deleteProduct:", error.response?.data || error.message);
    throw error;
  }
};
