import axios from "axios";
import { io } from "socket.io-client";

const API_URL =
  import.meta.env.VITE_GATEWAY_URL ||
  "https://logistics-backend-n3be.onrender.com";

// Send location update for a delivery person
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
    console.log("Location sent");
  } catch (error) {
    console.error(
      "Error sending location:",
      error.response?.data || error.message
    );
  }
};

// Get information about an order by its tracking code
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
    console.error("Error fetching order information:", error);
    throw error;
  }
};

// Get coordinates by address
export const getCoordsByAddress = async (address) => {
  try {
    const encodedAddress = encodeURIComponent(address.trim()); // Encode the address to handle special characters

    const response = await axios.get(
      `${API_URL}/orders/orders/coords/${encodedAddress}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching coordinates by address:", error);
    throw error;
  }
};

// Get the latest location of a delivery person
export const getLatestLocation = async (deliveryPersonId) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(
      `${API_URL}/geo/locations/latest?deliveryPersonId=${deliveryPersonId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { location } = response.data || {};

    // Check if the location is valid and has coordinates
    // Ensure that location is an object and has the coordinates array
    if (
      location &&
      Array.isArray(location.coordinates) &&
      location.coordinates.length === 2
    ) {
      return {
      lat: location.coordinates[1],
      lng: location.coordinates[0],
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching latest location:", error);
    throw error;
  }
};