import axios from "axios";

const API_URL =
  import.meta.env.VITE_GATEWAY_URL ||
  "https://logistics-backend-n3be.onrender.com";

console.log(`API_URL: ${API_URL}`);

// Obtener todos los almacenes
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

// Crear un almacén
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

// Actualizar un almacén
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

// Eliminar un almacén
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
