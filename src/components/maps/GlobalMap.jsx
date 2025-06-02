import React, { useEffect, useState, useRef } from "react";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import PropTypes from "prop-types";

import { FullScreenLoader } from "../../App";

const containerStyle = { width: "100%", height: "82.4vh" };
const defaultCenter = { lat: 4.65, lng: -74.05 };

const warehouseIcon =
  "https://maps.google.com/mapfiles/kml/shapes/library_maps.png";
const orderIcon =
  "https://maps.google.com/mapfiles/kml/shapes/shopping_cart.png";
const deliveryIcon = "https://maps.google.com/mapfiles/kml/shapes/truck.png";

const GlobalMap = ({
  warehouses = [],
  orders = [],
  deliveries = [],
  deliveryId,
}) => {
  const [center, setCenter] = useState(defaultCenter);

  // Actualiza el centro al último delivery si deliveryId existe
  useEffect(() => {
    if (!deliveryId) {
      setCenter(defaultCenter);
      return;
    }
    const delivery = deliveries.find((d) => d.deliveryId === deliveryId);
    if (delivery?.lat && delivery?.lng) {
      setCenter({ lat: delivery.lat, lng: delivery.lng });
    } else {
      setCenter(defaultCenter);
    }
  }, [deliveryId, deliveries]);

  if (!warehouses || !orders || !deliveries) {
    return <FullScreenLoader message="Cargando mapa..." />;
  }

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} zoom={12} center={center}>
        {/* Marcadores almacenes */}
        {warehouses.map((wh, i) => (
          <Marker
            key={`wh-${i}`}
            position={{ lat: wh.lat, lng: wh.lng }}
            icon={{
              url: warehouseIcon,
              scaledSize: new window.google.maps.Size(32, 32),
            }}
            title={`Almacén #${i + 1}`}
          />
        ))}

        {/* Marcadores pedidos */}
        {orders.map((order, i) => (
          <Marker
            key={`order-${i}`}
            position={{ lat: order.lat, lng: order.lng }}
            icon={{
              url: orderIcon,
              scaledSize: new window.google.maps.Size(32, 32),
            }}
            title={`Pedido #${i + 1}`}
          />
        ))}

        {/* Marcadores deliveries */}
        {deliveries.map((del, i) => (
          <Marker
            key={`del-${del.deliveryId}`}
            position={{ lat: del.lat, lng: del.lng }}
            icon={{
              url: deliveryIcon,
              scaledSize: new window.google.maps.Size(32, 32),
            }}
            title={`Delivery: ${del.deliveryId}`}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};
GlobalMap.propTypes = {
  warehouses: PropTypes.arrayOf(
    PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    })
  ),
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    })
  ),
  deliveries: PropTypes.arrayOf(
    PropTypes.shape({
      deliveryId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    })
  ),
  deliveryId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default GlobalMap;
