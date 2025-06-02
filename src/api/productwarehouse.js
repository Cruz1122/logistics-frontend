import axios from "axios";

const API_URL =
  import.meta.env.VITE_GATEWAY_URL ||
  "https://logistics-backend-n3be.onrender.com";


/**
 * Get all ProductWarehouses.
 * Returns an array of objects with the fields:
 * id, productId, warehouseId, stockQuantity, reorderLevel,
 * lastRestock, expirationDate, status, deletedAt
 */
export const getAllProductWarehouses = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/inventory/product-warehouse`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error in getAllProductWarehouses:", error.response?.data || error.message);
    return [];
  }
};

/**
 * Create a new ProductWarehouse.
 * Expects an object with:
 * {
 *   productId: string,
 *   warehouseId: string,
 *   stockQuantity: number,
 *   reorderLevel: number,
 *   lastRestock: string (ISO date),
 *   expirationDate: string (ISO date),
 *   status: string,
 *   deletedAt?: string | null
 * }
 */
export const createProductWarehouse = async (productWarehouseData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/inventory/product-warehouse`, productWarehouseData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error in createProductWarehouse:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Update an existing ProductWarehouse by ID.
 * You can send partial fields to update.
 */
export const updateProductWarehouse = async (id, productWarehouseData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(`${API_URL}/inventory/product-warehouse/${id}`, productWarehouseData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error in updateProductWarehouse:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Delete a ProductWarehouse by ID.
 */
export const deleteProductWarehouse = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${API_URL}/inventory/product-warehouse/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error in deleteProductWarehouse:", error.response?.data || error.message);
    throw error;
  }
};
