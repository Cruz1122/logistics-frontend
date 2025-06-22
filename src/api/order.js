import axios from "axios";

const API_URL =
  import.meta.env.VITE_GATEWAY_URL ||
  "https://logistics-backend-n3be.onrender.com";


/**
 * Function to get all orders
 * Sends: Header with JWT token.
 * Receives: Array of orders, each with the following structure:
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
      "Error in getAllOrders:",
      error.response?.data || error.message
    );
    return [];
  }
};

/**
 * Function to create a new order
 * Sends in the body:
 * {
 *   customerId: string,
 *   delivery_id: string,
 *   status: string, // Example: "PENDING"
 *   deliveryAddress: string,
 *   creationDate: string (ISO),
 *   estimatedDeliveryTime: string (ISO),
 *   totalAmount: number,
 *   trackingCode: string
 * }
 * Header: Authorization with JWT token.
 * Receives:
 * {
 *   id: string,
 *   ...all sent fields
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
      "Error in createOrder:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * Function to update an existing order
 * Sends:
 *   id: string (in the URL),
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
 * Header: Authorization with JWT token.
 * Receives:
 * {
 *   id: string,
 *   ...updated fields
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
      "Error in updateOrder:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * Function to delete an order by its ID
 * Sends:
 *   id: string (in the URL)
 * Header: Authorization with JWT token.
 * Receives:
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
      "Error in deleteOrder:",
      error.response?.data || error.message
    );
    throw error;
  }
};
