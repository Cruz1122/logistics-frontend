import axios from "axios";

const API_URL =
  import.meta.env.VITE_GATEWAY_URL ||
  "https://logistics-backend-n3be.onrender.com";


/**
 * Obtener todos los almacenes.
 * Retorna un array con objetos que tienen:
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
    console.error("Error en getAllWarehouses:", error.response?.data || error.message);
    return [];
  }
};

/**
 * Crear un nuevo almacén.
 * warehouseData debe contener:
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
 * Retorna el objeto almacén creado.
 */
export const createWarehouse = async (warehouseData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/inventory/warehouse`, warehouseData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error en createWarehouse:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Actualizar un almacén existente.
 * id: id del almacén a actualizar.
 * warehouseData con los campos para actualizar (los mismos que en create).
 * Retorna el objeto almacén actualizado.
 */
export const updateWarehouse = async (id, warehouseData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(`${API_URL}/inventory/warehouse/${id}`, warehouseData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error en updateWarehouse:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Eliminar un almacén por id.
 * Retorna un objeto de confirmación.
 */
export const deleteWarehouse = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${API_URL}/inventory/warehouse/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error en deleteWarehouse:", error.response?.data || error.message);
    throw error;
  }
};
