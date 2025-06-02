import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import warehouseIcon from "../../assets/icons/warehouse.png";
import orderIcon from "../../assets/icons/order.png";
import deliveryIcon from "../../assets/icons/delivery.png";
import { FullScreenLoader } from "../../App";

const containerStyle = { width: "100%", height: "82.4vh" };
const defaultCenter = { lat: 4.65, lng: -74.05 };

const GlobalMap = () => {
  const location = useLocation();
  const { deliveryId } = useParams();

  const {
    orders = [],
    warehouses = [],
    deliveries = [],
  } = location.state || {};

  const [center, setCenter] = useState(defaultCenter);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey:
      import.meta.env.VITE_GOOGLE_MAPS_API_KEY ||
      "AIzaSyCh8r-3KBav3cRI6gRWWqrgAaHw1Qsg-nE",
  });

  useEffect(() => {
    if (!deliveryId) {
      setCenter(defaultCenter);
      return;
    }

    const delivery = deliveries.find(
      (d) => `${d.deliveryPersonId}` === `${deliveryId}`
    );
    if (delivery?.lat && delivery?.lng) {
      setCenter({ lat: delivery.lat, lng: delivery.lng });
    } else {
      setCenter(defaultCenter);
    }
  }, [deliveryId, deliveries]);

  if (!isLoaded) return <FullScreenLoader />;

  // Se puede usar google.maps aquí porque ya está cargado
  const createIcon = (url) => ({
    url,
    scaledSize: new google.maps.Size(32, 32),
  });

  return (
    <GoogleMap mapContainerStyle={containerStyle} zoom={12} center={center}>
      {warehouses.map((wh, i) => (
        <Marker
          key={`wh-${i}`}
          position={{ lat: wh.lat, lng: wh.lng }}
          icon={createIcon(warehouseIcon)}
          title={`Almacén #${wh.warehouseId}`}
        />
      ))}
      {orders.map((order, i) => (
        <Marker
          key={`order-${i}`}
          position={{ lat: order.lat, lng: order.lng }}
          icon={createIcon(orderIcon)}
          title={`Pedido #${order.orderId}`}
        />
      ))}
      {deliveries.map((del) => (
        <Marker
          key={`del-${del.deliveryPersonId}`}
          position={{ lat: del.lat, lng: del.lng }}
          icon={createIcon(deliveryIcon)}
          title={`Delivery: ${del.deliveryPersonId}\nName: ${del.name}`}
        />
      ))}
    </GoogleMap>
  );
};

export default GlobalMap;
