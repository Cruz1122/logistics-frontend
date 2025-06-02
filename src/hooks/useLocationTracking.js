import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { sendLocationUpdate } from "../api/locationService";
import { getDeliveryId, getUserIdFromToken } from "../api/user";
import { getRoleByName } from "../api/role"; // esta función devuelve el id directamente

export const useLocationTracking = () => {
  const intervalRef = useRef(null);
  const auth = useSelector((state) => state.auth);
  const [deliveryRoleId, setDeliveryRoleId] = useState(null);

  useEffect(() => {
    const fetchDeliveryRoleId = async () => {
      const id = await getRoleByName("Delivery"); // devuelve solo el id
      setDeliveryRoleId(id);
    };
    fetchDeliveryRoleId();
  }, []);

  useEffect(() => {
    if (!deliveryRoleId) return; // espera a tener el id
    if (auth?.rolId !== deliveryRoleId) return; // solo si es delivery

    console.log("Location tracking enabled");

    const updateLocation = async () => {
      const userId = getUserIdFromToken();
      const deliveryPersonId = await getDeliveryId(userId);
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
            console.log("Location obtained:", position);

          const { latitude, longitude } = position.coords;
          sendLocationUpdate(deliveryPersonId, latitude, longitude);
        },
        (error) => {
          console.error("Error obtaining location:", error);
        }
      );
    };

    updateLocation(); // primera vez
    intervalRef.current = setInterval(updateLocation, 30000);

    return () => clearInterval(intervalRef.current);
  }, [deliveryRoleId, auth?.rolId]);
};
