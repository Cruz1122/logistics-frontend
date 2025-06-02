import axios from "axios";

const API_URL =
  import.meta.env.VITE_GATEWAY_URL ||
  "https://logistics-backend-n3be.onrender.com";

console.log(`API_URL: ${API_URL}`);

/**
 * Obtiene todas las categorías registradas en el sistema.
 * Envia: Header con token JWT.
 * Recibe: Array de objetos categoría.
 * Ejemplo de respuesta:
 * [
 *   { id: "123", name: "Electrónica" },
 *   ...
 * ]
 */
export const getAllCategories = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${API_URL}/inventory/category`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error en getAllCategories:",
      error.response?.data || error.message
    );
    return [];
  }
};

/**
 * Crea una nueva categoría.
 * Envia:
 * {
 *   name: string
 * }
 * Header: Authorization con token JWT.
 * Recibe:
 * {
 *   id: string,
 *   name: string,
 * }
 */
export const createCategory = async (categoryData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${API_URL}/inventory/category`,
      categoryData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error en createCategory:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * Actualiza una categoría existente por ID.
 * Envia:
 *   id: string (como parte de la URL),
 *   body: {
 *     name: string
 *   }
 * Header: Authorization con token JWT.
 * Recibe:
 * {
 *   id: string,
 *   name: string,
 * }
 */
export const updateCategory = async (id, categoryData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.put(
      `${API_URL}/inventory/category/${id}`,
      categoryData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error en updateCategory:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * Elimina una categoría por ID.
 * Envia:
 *   id: string (como parte de la URL)
 * Header: Authorization con token JWT.
 * Recibe:
 * {
 *   message: string
 * }
 */
export const deleteCategory = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.delete(`${API_URL}/inventory/category/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error en deleteCategory:",
      error.response?.data || error.message
    );
    throw error;
  }
};
