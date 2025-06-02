import axios from "axios";

const API_URL =
  import.meta.env.VITE_GATEWAY_URL ||
  "https://logistics-backend-n3be.onrender.com";

console.log(`API_URL: ${API_URL}`);

/**
 * Obtiene todas las personas de entrega.
 * Envia: Header con token JWT.
 * Recibe: Array de objetos persona de entrega.
 * Ejemplo:
 * [
 *   {
 *     id: "dp123",
 *     name: "Juan Pérez",
 *     idUser: "user123",
 *     ... (otros campos)
 *   },
 *   ...
 * ]
 */
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

/**
 * Crea una nueva persona de entrega.
 * Envia:
 * {
 *   fullName: string,
 *   phone: string,
 *   email: string
 * }
 * Header: Authorization con token JWT.
 * Recibe:
 * {
 *   id: string,
 *   name: string,
 *   idUser: string,
 *   ... (otros campos),
 * }
 */
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

/**
 * Actualiza una persona de entrega existente por ID.
 * Envia:
 *   id: string (en URL),
 *   body: {
 *     name?: string,
 *     idUser?: string,
 *     ... // otros campos opcionales
 *   }
 * Header: Authorization con token JWT.
 * Recibe:
 * {
 *   id: string,
 *   name: string,
 *   idUser: string,
 *  ... // otros campos actualizados
 * }
 */
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

/**
 * Elimina una persona de entrega por ID.
 * Envia:
 *   id: string (en URL)
 * Header: Authorization con token JWT.
 * Recibe:
 * {
 *   message: string
 * }
 */
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
