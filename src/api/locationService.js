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
      `${API_URL}/geo/locations/track?trackingCode=${code}`,
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

// Trackeo por WebSocket
let socket = null;

export const trackOrder = (deliveryId) => {
  if (socket) {
    socket.disconnect(); // Cierra conexiones anteriores
  }

  socket = io(`http://localhost:4002/`);

  socket.on("connect", () => {
    console.log("Conectado con socket id:", socket.id);
    socket.emit("subscribe", { deliveryPersonId: deliveryId });
  });

  socket.on("locationUpdate", (data) => {
    console.log("Nueva ubicación recibida:", data);
    // Aquí puedes actualizar un mapa o UI si lo necesitas
  });
};

// (opcional) Acceder a socket desde otro lado
