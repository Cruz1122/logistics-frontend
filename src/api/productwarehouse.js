import axios from "axios";

const API_URL =
  import.meta.env.VITE_GATEWAY_URL ||
  "https://logistics-backend-n3be.onrender.com";


/**
 * Obtener todos los ProductWarehouses.
 * Retorna un array de objetos con los campos:
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
    console.error("Error en getAllProductWarehouses:", error.response?.data || error.message);
    return [];
  }
};

/**
 * Crear un nuevo ProductWarehouse.
 * Espera un objeto con:
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
    console.error("Error en createProductWarehouse:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Actualizar un ProductWarehouse existente por ID.
 * Puede enviar campos parciales para actualizar.
 */
export const updateProductWarehouse = async (id, productWarehouseData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(`${API_URL}/inventory/product-warehouse/${id}`, productWarehouseData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error en updateProductWarehouse:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Eliminar un ProductWarehouse por ID.
 */
export const deleteProductWarehouse = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${API_URL}/inventory/product-warehouse/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error en deleteProductWarehouse:", error.response?.data || error.message);
    throw error;
  }
};
