import axios from "axios";

const API_URL =
  import.meta.env.VITE_GATEWAY_URL ||
  "https://logistics-backend-n3be.onrender.com";

console.log(`API_URL: ${API_URL}`);

/**
 * Obtener todos los ProductSuppliers.
 * Envia: Header con token JWT.
 * Recibe: Array con estructura:
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
    console.error("Error en getAllProductSuppliers:", error.response?.data || error.message);
    return [];
  }
};

/**
 * Crear un nuevo ProductSupplier.
 * Envia en el body:
 * {
 *   productId: string,
 *   supplierId: string
 * }
 * Header: Authorization con token JWT.
 * Recibe:
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
    console.error("Error en createProductSupplier:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Actualizar un ProductSupplier existente.
 * Envia:
 *   id: string (en la URL),
 *   body: {
 *     productId?: string,
 *     supplierId?: string
 *   }
 * Header: Authorization con token JWT.
 * Recibe:
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
    console.error("Error en updateProductSupplier:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Eliminar un ProductSupplier por su ID.
 * Envia:
 *   id: string (en la URL)
 * Header: Authorization con token JWT.
 * Recibe:
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
    console.error("Error en deleteProductSupplier:", error.response?.data || error.message);
    throw error;
  }
};
