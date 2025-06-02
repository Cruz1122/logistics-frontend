import axios from "axios";

const API_URL =
  import.meta.env.VITE_GATEWAY_URL ||
  "https://logistics-backend-n3be.onrender.com";


/**
 * Obtener todos los suppliers.
 * Envia: Header con token JWT.
 * Recibe: Array con estructura:
 * [
 *   {
 *     id: string,
 *     name: string,
 *     phone: string,
 *     email: string
 *   },
 *   ...
 * ]
 */
export const getAllSuppliers = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${API_URL}/inventory/supplier`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error en getAllSuppliers:",
      error.response?.data || error.message
    );
    return [];
  }
};

/**
 * Crear un nuevo supplier.
 * Envia: Header con token JWT y body con:
 * {
 *   name: string,
 *   phone: string,
 *   email: string
 * }
 * Recibe: Objeto con el supplier creado:
 * {
 *   id: string,
 *   name: string,
 *   phone: string,
 *   email: string
 * }
 */
export const createSupplier = async (supplierData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${API_URL}/inventory/supplier`,
      supplierData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error en createSupplier:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * Editar un supplier existente.
 * Envia: Header con token JWT y body con:
 * {
 *   name: string,
 *   phone: string,
 *   email: string
 * }
 * Recibe: Objeto con el supplier actualizado:
 * {
 *   id: string,
 *   name: string,
 *   phone: string,
 *   email: string
 * }
 */
export const updateSupplier = async (id, supplierData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.put(
      `${API_URL}/inventory/supplier/${id}`,
      supplierData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error en updateSupplier:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * Eliminar un supplier.
 * Envia: Header con token JWT.
 * Recibe: Objeto con confirmación de eliminación.
 */
export const deleteSupplier = async (id) => {
  try {
    const token = localStorage.getItem("token");
    
    const response = await axios.delete(`${API_URL}/inventory/supplier/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error en deleteSupplier:",
      error.response?.data || error.message
    );
    throw error;
  }
};
