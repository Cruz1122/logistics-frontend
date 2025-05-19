import axios from "axios";

const API_URL =
  import.meta.env.VITE_GATEWAY_URL ||
  "https://logistics-backend-n3be.onrender.com";

console.log(`API_URL: ${API_URL}`);

// Obtener todos los ProductWarehouses
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

// Crear un ProductWarehouse
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

// Actualizar un ProductWarehouse
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

// Eliminar un ProductWarehouse
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
