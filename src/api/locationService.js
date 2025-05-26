import axios from "axios";
import { io } from "socket.io-client";

const API_URL =
  import.meta.env.VITE_GATEWAY_URL ||
  "https://logistics-backend-n3be.onrender.com";

// Enviar ubicación desde el repartidor
export const sendLocationUpdate = async (deliveryPersonId, lat, lng) => {
  const token = localStorage.getItem("token");
  try {
    await axios.post(
      `${API_URL}/geo/locations/update`,
      {
        deliveryPersonId,
        location: {
          type: "Point",
          coordinates: [lng, lat],
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Ubicación enviada");
  } catch (error) {
    console.error(
      "Error enviando ubicación:",
      error.response?.data || error.message
    );
  }
};

// Obtener información de la orden
export const getInfoOrder = async (code) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(
      `${API_URL}/orders/orders/tracking/${code}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener la información de la orden:", error);
    throw error;
  }
};

// Obtener coords dada una dirección
export const getCoordsByAddress = async (address) => {
  try {
    const encodedAddress = encodeURIComponent(address.trim());

    const response = await axios.get(
      `${API_URL}/orders/orders/coords/${encodedAddress}`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener las coordenadas de la dirección:", error);
    throw error;
  }
};