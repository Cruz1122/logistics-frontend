import axios from "axios";

const API_URL =
  import.meta.env.VITE_GATEWAY_URL ||
  "https://logistics-backend-n3be.onrender.com";


/**
 * Get all order products.
 * Sends: Header with JWT token.
 * Receives: Array of products per order, each with the following structure:
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
      "Error in getAllOrderProducts:",
      error.response?.data || error.message
    );
    return [];
  }
};

/**
 * Create a new product for an order.
 * Sends in the body:
 * {
 *   orderId: string,
 *   productId: string,
 *   quantity: number,
 *   unitPrice: number
 * }
 * Header: Authorization with JWT token.
 * Receives:
 * {
 *   id: string,
 *   ...all sent fields
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
      "Error in createOrderProduct:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * Update a product of an existing order.
 * Sends:
 *   id: string (in the URL),
 *   body: {
 *     orderId?: string,
 *     productId?: string,
 *     quantity?: number,
 *     unitPrice?: number
 *   }
 * Header: Authorization with JWT token.
 * Receives:
 * {
 *   id: string,
 *   ...updated fields
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
      "Error in updateOrderProduct:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * Delete a product from an order by its ID.
 * Sends:
 *   id: string (in the URL)
 * Header: Authorization with JWT token.
 * Receives:
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
      "Error in deleteOrderProduct:",
      error.response?.data || error.message
    );
    throw error;
  }
};
