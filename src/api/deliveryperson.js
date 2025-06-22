import axios from "axios";

const API_URL =
  import.meta.env.VITE_GATEWAY_URL ||
  "https://logistics-backend-n3be.onrender.com";

/**
 * Gets all delivery persons.
 * Sends: Header with JWT token.
 * Receives: Array of delivery person objects.
 * Example:
 * [
 *   {
 *     id: "dp123",
 *     name: "Juan Pérez",
 *     idUser: "user123",
 *     ... (other fields)
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
      "Error in getAllPersonDeliveries:",
      error.response?.data || error.message
    );
    return [];
  }
};

/**
 * Creates a new delivery person.
 * Sends:
 * {
 *   fullName: string,
 *   phone: string,
 *   email: string
 * }
 * Header: Authorization with JWT token.
 * Receives:
 * {
 *   id: string,
 *   name: string,
 *   idUser: string,
 *   ... (other fields),
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
      "Error in createPersonDelivery:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * Updates an existing delivery person by ID.
 * Sends:
 *   id: string (in URL),
 *   body: {
 *     name?: string,
 *     idUser?: string,
 *     ... // other optional fields
 *   }
 * Header: Authorization with JWT token.
 * Receives:
 * {
 *   id: string,
 *   name: string,
 *   idUser: string,
 *   ... // other updated fields
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
      "Error in updatePersonDelivery:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * Deletes a delivery person by ID.
 * Sends:
 *   id: string (in URL)
 * Header: Authorization with JWT token.
 * Receives:
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
      "Error in deletePersonDelivery:",
      error.response?.data || error.message
    );
    throw error;
  }
};
