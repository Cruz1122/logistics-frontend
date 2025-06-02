import axios from "axios";

const API_URL =
  import.meta.env.VITE_GATEWAY_URL ||
  "https://logistics-backend-n3be.onrender.com";


/**
 * Obtener todas las órdenes.
 * Envia: Header con token JWT.
 * Recibe: Array de órdenes, cada una con la siguiente estructura:
 * [
 *   {
 *     id: string,
 *     customerId: string,
 *     delivery_id: string,
 *     status: "PENDING" | "IN_PROGRESS" | "DELIVERED" | "CANCELLED",
 *     deliveryAddress: string,
 *     creationDate: string (ISO),
 *     estimatedDeliveryTime: string (ISO),
 *     totalAmount: number,
 *     trackingCode: string
 *   },
 *   ...
 * ]
 */
export const getAllOrders = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${API_URL}/orders/orders/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error en getAllOrders:",
      error.response?.data || error.message
    );
    return [];
  }
};

/**
 * Crear una nueva orden.
 * Envia en el body:
 * {
 *   customerId: string,
 *   delivery_id: string,
 *   status: string, // Ejemplo: "PENDING"
 *   deliveryAddress: string,
 *   creationDate: string (ISO),
 *   estimatedDeliveryTime: string (ISO),
 *   totalAmount: number,
 *   trackingCode: string
 * }
 * Header: Authorization con token JWT.
 * Recibe:
 * {
 *   id: string,
 *   ...todos los campos enviados
 * }
 */
export const createOrder = async (orderData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(`${API_URL}/orders/orders/`, orderData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error en createOrder:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * Actualiza una orden existente.
 * Envia:
 *   id: string (en la URL),
 *   body: {
 *     customerId?: string,
 *     delivery_id?: string,
 *     status?: string,
 *     deliveryAddress?: string,
 *     creationDate?: string,
 *     estimatedDeliveryTime?: string,
 *     totalAmount?: number,
 *     trackingCode?: string
 *   }
 * Header: Authorization con token JWT.
 * Recibe:
 * {
 *   id: string,
 *   ...campos actualizados
 * }
 */
export const updateOrder = async (id, orderData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.put(`${API_URL}/orders/orders/${id}`, orderData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error en updateOrder:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * Elimina una orden por su ID.
 * Envia:
 *   id: string (en la URL)
 * Header: Authorization con token JWT.
 * Recibe:
 * {
 *   message: string
 * }
 */
export const deleteOrder = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.delete(`${API_URL}/orders/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error en deleteOrder:",
      error.response?.data || error.message
    );
    throw error;
  }
};
