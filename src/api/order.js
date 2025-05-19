import axios from "axios";

const API_URL =
  import.meta.env.VITE_GATEWAY_URL ||
  "https://logistics-backend-n3be.onrender.com";

console.log(`API_URL: ${API_URL}`);

// Obtener todas las órdenes
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

// Crear una nueva orden
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

// Editar una orden existente
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

// Eliminar una orden
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
