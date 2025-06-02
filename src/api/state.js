import axios from "axios";

const API_URL =
  import.meta.env.VITE_GATEWAY_URL ||
  "https://logistics-backend-n3be.onrender.com";


/**
 * Obtener todos los estados.
 * Envia: Header con token JWT.
 * Recibe: Array con estructura:
 * [
 *   {
 *     id: string,
 *     name: string
 *   },
 *   ...
 * ]
 */
export const getAllStates = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${API_URL}/inventory/state`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error en getAllStates:",
      error.response?.data || error.message
    );
    return [];
  }
};

/**
 * Crear un nuevo estado.
 * Envia: Header con token JWT y body con:
 * {
 *   name: string
 * }
 * Recibe: Objeto con el estado creado:
 * {
 *   id: string,
 *   name: string
 * }
 */
export const createState = async (stateData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${API_URL}/inventory/state`,
      stateData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error en createState:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * Editar un estado existente.
 * Envia: Header con token JWT y body con:
 * {
 *   name: string
 * }
 * Recibe: Objeto con el estado actualizado:
 * {
 *   id: string,
 *   name: string
 * }
 */
export const updateState = async (id, stateData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.put(
      `${API_URL}/inventory/state/${id}`,
      stateData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error en updateState:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * Eliminar un estado.
 * Envia: Header con token JWT.
 * Recibe: Objeto con confirmación de eliminación.
 */
export const deleteState = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.delete(`${API_URL}/inventory/state/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error en deleteState:",
      error.response?.data || error.message
    );
    throw error;
  }
};
