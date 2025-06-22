import axios from "axios";

const API_URL =
  import.meta.env.VITE_GATEWAY_URL ||
  "https://logistics-backend-n3be.onrender.com";


/**
 * Get all warehouses.
 * Returns an array of objects with:
 * {
 *   id: string,
 *   cityId: string,
 *   managerId: string,
 *   name: string,
 *   address: string,
 *   postalCode: string,
 *   latitude: number,
 *   longitude: number,
 *   capacityM2: number,
 *   status: string
 * }
 */
export const getAllWarehouses = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/inventory/warehouse`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error in getAllWarehouses:", error.response?.data || error.message);
    return [];
  }
};

/**
 * Create a new warehouse.
 * warehouseData must contain:
 * {
 *   cityId: string,
 *   managerId: string,
 *   name: string,
 *   address: string,
 *   postalCode: string,
 *   latitude: number,
 *   longitude: number,
 *   capacityM2: number,
 *   status: string
 * }
 * Returns the created warehouse object.
 */
export const createWarehouse = async (warehouseData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/inventory/warehouse`, warehouseData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error in createWarehouse:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Update an existing warehouse.
 * id: id of the warehouse to update.
 * warehouseData with the fields to update (same as in create).
 * Returns the updated warehouse object.
 */
export const updateWarehouse = async (id, warehouseData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(`${API_URL}/inventory/warehouse/${id}`, warehouseData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error in updateWarehouse:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Delete a warehouse by id.
 * Returns a confirmation object.
 */
export const deleteWarehouse = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${API_URL}/inventory/warehouse/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error in deleteWarehouse:", error.response?.data || error.message);
    throw error;
  }
};
