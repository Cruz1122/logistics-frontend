import axios from "axios";

const API_URL =
  import.meta.env.VITE_GATEWAY_URL ||
  "https://logistics-backend-n3be.onrender.com";

console.log(`API_URL: ${API_URL}`);

// Obtener todas las personas de entrega
export const getAllPersonDelivery = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${API_URL}/orders/delivery-persons`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error en getAllPersonDeliveries:",
      error.response?.data || error.message
    );
    return [];
  }
};

// Crear una nueva persona de entrega
export const createPersonDelivery = async (personDeliveryData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${API_URL}/orders/delivery-persons`,
      personDeliveryData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error en createPersonDelivery:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Editar una persona de entrega existente
export const updatePersonDelivery = async (id, personDeliveryData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.put(
      `${API_URL}/orders/delivery-persons/${id}`,
      personDeliveryData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error en updatePersonDelivery:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Eliminar una persona de entrega
export const deletePersonDelivery = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.delete(`${API_URL}/orders/delivery-persons/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error en deletePersonDelivery:",
      error.response?.data || error.message
    );
    throw error;
  }
};
