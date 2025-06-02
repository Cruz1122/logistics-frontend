import axios from "axios";

const API_URL =
  import.meta.env.VITE_GATEWAY_URL ||
  "https://logistics-backend-n3be.onrender.com";

export const getAllOrders = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_URL}/geo/locations/orders`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error en getAllOrders:", error.response?.data || error.message);
        return [];
    }
};

export const getAllWarehouses = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_URL}/geo/locations/warehouses`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error en getAllWarehouses:", error.response?.data || error.message);
        return [];
    }
};

export const getAllDeliveries = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_URL}/geo/locations/deliveries`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error en getAllDeliveries:", error.response?.data || error.message);
        return [];
    }
};
