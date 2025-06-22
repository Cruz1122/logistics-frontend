import axios from "axios";

const API_URL =
  import.meta.env.VITE_GATEWAY_URL ||
  "https://logistics-backend-n3be.onrender.com";



// Get all product movements in warehouses
export const getAllProductWarehouseMovements = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/inventory/product-movement`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error in getAllProductWarehouseMovements:",
      error.response?.data || error.message
    );
    return [];
  }
};

