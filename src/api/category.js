import axios from "axios";

const API_URL =
  import.meta.env.VITE_GATEWAY_URL ||
  "https://logistics-backend-n3be.onrender.com";

/**
 * Gets all categories registered in the system.
 * Sends: Header with JWT token.
 * Receives: Array of category objects.
 * Example response:
 * [
 *   { id: "123", name: "Electronics" },
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
      "Error in getAllCategories:",
      error.response?.data || error.message
    );
    return [];
  }
};

/**
 * Creates a new category.
 * Sends:
 * {
 *   name: string
 * }
 * Header: Authorization with JWT token.
 * Receives:
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
      "Error in createCategory:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * Updates an existing category by ID.
 * Sends:
 *   id: string (as part of the URL),
 *   body: {
 *     name: string
 *   }
 * Header: Authorization with JWT token.
 * Receives:
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
      "Error in updateCategory:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * Deletes a category by ID.
 * Sends:
 *   id: string (as part of the URL)
 * Header: Authorization with JWT token.
 * Receives:
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
      "Error in deleteCategory:",
      error.response?.data || error.message
    );
    throw error;
  }
};
