import axios from "axios";

const API_URL =
  import.meta.env.VITE_GATEWAY_URL ||
  "https://logistics-backend-n3be.onrender.com";

console.log(`API_URL: ${API_URL}`);

/**
 * Obtiene todas las ciudades registradas.
 * Envia: Header con token JWT.
 * Recibe: Array de objetos ciudad.
 * Ejemplo:
 * [
 *   { id: "abc123", name: "Medellín", stateId: "123"},
 *   ...
 * ]
 */
export const getAllCities = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/inventory/city`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error en getAllCities:", error.response?.data || error.message);
    return [];
  }
};

/**
 * Crea una nueva ciudad.
 * Envia:
 * {
 *   name: string,
 *   stateId: string
 * }
 * Header: Authorization con token JWT.
 * Recibe:
 * {
 *   id: string,
 *   name: string,
 *   stateId: string,
 * }
 */
export const createCity = async (cityData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/inventory/city`, cityData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error en createCity:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Actualiza una ciudad existente por ID.
 * Envia:
 *   id: string (en URL),
 *   body: {
 *     name: string,
 *     stateId: string
 *   }
 * Header: Authorization con token JWT.
 * Recibe:
 * {
 *   id: string,
 *   name: string,
  *  stateId: string,
 * }
 */
export const updateCity = async (id, cityData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(`${API_URL}/inventory/city/${id}`, cityData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error en updateCity:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Elimina una ciudad por ID.
 * Envia:
 *   id: string (en URL)
 * Header: Authorization con token JWT.
 * Recibe:
 * {
 *   message: string
 * }
 */
export const deleteCity = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${API_URL}/inventory/city/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error en deleteCity:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Obtiene una ciudad por su ID.
 * Envia:
 *   id: string (en URL)
 * Header: Authorization con token JWT.
 * Recibe:
 * {
 *   id: string,
 *   name: string,
 *   stateId: string
 * }
 */
export const getCityById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/inventory/city/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error en getCityById:", error.response?.data || error.message);
    throw error;
  }
};
