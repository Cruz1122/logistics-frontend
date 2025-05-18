import axios from "axios";

const API_URL =
  import.meta.env.VITE_GATEWAY_URL ||
  "https://logistics-backend-n3be.onrender.com";

console.log(`API_URL: ${API_URL}`);

// Obtener todas las categorías
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

// Crear una nueva categoría
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

// Editar una categoría existente
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

// Eliminar una categoría
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
