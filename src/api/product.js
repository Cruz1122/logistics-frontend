import axios from "axios";

const API_URL =
  import.meta.env.VITE_GATEWAY_URL ||
  "https://logistics-backend-n3be.onrender.com";

console.log(`API_URL: ${API_URL}`);

/**
 * Obtener todos los productos.
 * Envia: Header con token JWT.
 * Recibe: Array de productos con estructura:
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
    console.error("Error en getAllProducts:", error.response?.data || error.message);
    return [];
  }
};

/**
 * Crear un nuevo producto.
 * Envia en el body:
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
 * Header: Authorization con token JWT.
 * Recibe:
 * {
 *   id: string,
 *   ...otros campos enviados
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
    console.error("Error en createProduct:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Actualizar un producto existente.
 * Envia:
 *   id: string (en la URL),
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
 * Header: Authorization con token JWT.
 * Recibe:
 * {
 *   id: string,
 *   ...campos actualizados
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
    console.error("Error en updateProduct:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Eliminar un producto por su ID.
 * Envia:
 *   id: string (en la URL)
 * Header: Authorization con token JWT.
 * Recibe:
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
    console.error("Error en deleteProduct:", error.response?.data || error.message);
    throw error;
  }
};
