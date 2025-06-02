import axios from "axios";

const API_URL =
  import.meta.env.VITE_GATEWAY_URL ||
  "https://logistics-backend-n3be.onrender.com";


/**
 * Obtener todos los productos de las órdenes.
 * Envia: Header con token JWT.
 * Recibe: Array de productos por orden, cada uno con la siguiente estructura:
 * [
 *   {
 *     id: string,
 *     orderId: string,
 *     productId: string,
 *     quantity: number,
 *     unitPrice: number
 *   },
 *   ...
 * ]
 */
export const getAllOrderProducts = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${API_URL}/orders/order-products/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error en getAllOrderProducts:",
      error.response?.data || error.message
    );
    return [];
  }
};

/**
 * Crear un nuevo producto para una orden.
 * Envia en el body:
 * {
 *   orderId: string,
 *   productId: string,
 *   quantity: number,
 *   unitPrice: number
 * }
 * Header: Authorization con token JWT.
 * Recibe:
 * {
 *   id: string,
 *   ...todos los campos enviados
 * }
 */
export const createOrderProduct = async (orderProductData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(`${API_URL}/orders/order-products/`, orderProductData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error en createOrderProduct:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * Actualiza un producto de una orden existente.
 * Envia:
 *   id: string (en la URL),
 *   body: {
 *     orderId?: string,
 *     productId?: string,
 *     quantity?: number,
 *     unitPrice?: number
 *   }
 * Header: Authorization con token JWT.
 * Recibe:
 * {
 *   id: string,
 *   ...campos actualizados
 * }
 */
export const updateOrderProduct = async (id, orderProductData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.put(`${API_URL}/orders/order-products/${id}`, orderProductData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error en updateOrderProduct:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * Elimina un producto de una orden por su ID.
 * Envia:
 *   id: string (en la URL)
 * Header: Authorization con token JWT.
 * Recibe:
 * {
 *   message: string
 * }
 */
export const deleteOrderProduct = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.delete(`${API_URL}/orders/order-products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error en deleteOrderProduct:",
      error.response?.data || error.message
    );
    throw error;
  }
};
