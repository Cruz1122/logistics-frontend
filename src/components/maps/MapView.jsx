import React, { useEffect, useRef, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import {
  LoadScript,
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
  Marker,
} from "@react-google-maps/api";

import { Card, Typography, Row, Col, Space } from "antd";
import {
  EnvironmentOutlined,
  ClockCircleOutlined,
  SwapOutlined,
  CarOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const containerStyle = {
  width: "100%",
  height: "82.4vh",
};

const defaultCenter = {
  lat: 4.65,
  lng: -74.05,
};

const MapView = () => {
  const { deliveryId } = useParams();
  const location = useLocation();
  const addressCoordinates = location.state?.addressCoordinates;

  const [markerPosition, setMarkerPosition] = useState(null);
  const [directions, setDirections] = useState(null);
  const [routeInfo, setRouteInfo] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapOptions, setMapOptions] = useState({
    draggable: true,
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: false,
    streetViewControl: false,
    fullscreenControl: false,
    // No ponemos mapTypeControl aquí para evitar error inicial
  });

  const mapRef = useRef(null);
  const socketRef = useRef(null);

  // Inicializa WebSocket y escucha ubicación delivery
  useEffect(() => {
    if (!deliveryId) return;

    const socketClient = io("http://localhost:4002");
    socketRef.current = socketClient;

    socketClient.on("connect", () => {
      socketClient.emit("subscribe", { deliveryPersonId: deliveryId });
    });

    socketClient.on("locationUpdate", (data) => {
      const [lng, lat] = data.location.coordinates;
      setMarkerPosition({ lat, lng });
    });

    return () => {
      socketClient.disconnect();
    };
  }, [deliveryId]);

  // Callback cuando DirectionsService calcula ruta
  const directionsCallback = (response) => {
    if (response !== null) {
      if (response.status === "OK") {
        setDirections(response);
        const leg = response.routes[0].legs[0];
        setRouteInfo({
          distance: leg.distance.text,
          duration: leg.duration.text,
          origin: leg.start_address,
          destination: leg.end_address,
        });
      } else {
        console.error("Error al calcular ruta:", response);
      }
    }
  };

  // Cuando el mapa carga, seteamos opciones que requieren window.google.maps.*
  const onLoad = (map) => {
    mapRef.current = map;
    if (!mapLoaded) {
      map.panTo(markerPosition || defaultCenter);
      setMapLoaded(true);

      // Ahora sí podemos acceder a window.google.maps
      setMapOptions({
        draggable: true,
        zoomControl: true,
        scrollwheel: true,
        disableDoubleClickZoom: false,
        streetViewControl: false,
        fullscreenControl: false,
        mapTypeControl: true,
        mapTypeControlOptions: {
          style: window.google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
          position: window.google.maps.ControlPosition.TOP_RIGHT,
          mapTypeIds: [
            window.google.maps.MapTypeId.ROADMAP,
            window.google.maps.MapTypeId.SATELLITE,
            window.google.maps.MapTypeId.HYBRID,
            window.google.maps.MapTypeId.TERRAIN,
          ],
        },
      });
    }
  };

  if (!markerPosition || !addressCoordinates)
    return <div>Cargando mapa...</div>;

  return (
      <div style={{ position: "relative", width: "100%", height: "82.4vh" }}>
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            zoom={13}
            onLoad={onLoad}
            options={mapOptions}
          >
            <DirectionsService
              options={{
                origin: markerPosition,
                destination: addressCoordinates,
                travelMode: "DRIVING",
              }}
              callback={directionsCallback}
            />
            {directions && (
              <DirectionsRenderer
                options={{ directions, preserveViewport: true }}
              />
            )}
          </GoogleMap>
        </LoadScript>

        {routeInfo && (
          <Card
            style={{
              position: "absolute",
              top: 10,
              left: 10,
              width: 320,
              zIndex: 10,
              boxShadow: "0 4px 12px rgb(0 0 0 / 0.3)",
              borderRadius: "8px",
              backgroundColor: "white",
              opacity: 0.95,
            }}
            title={
              <Title level={4} style={{ margin: 0 }}>
                Información de la ruta
              </Title>
            }
          >
            <Row gutter={[16, 12]}>
              <Col span={24}>
                <Space>
                  <CarOutlined style={{ color: "#1890ff", fontSize: 20 }} />
                  <Text strong>Distancia:</Text>
                  <Text>{routeInfo.distance}</Text>
                </Space>
              </Col>
              <Col span={24}>
                <Space>
                  <ClockCircleOutlined
                    style={{ color: "#52c41a", fontSize: 20 }}
                  />
                  <Text strong>Tiempo estimado:</Text>
                  <Text>{routeInfo.duration}</Text>
                </Space>
              </Col>
              <Col span={24}>
                <Space>
                  <EnvironmentOutlined
                    style={{ color: "#fa541c", fontSize: 20 }}
                  />
                  <Text strong>Origen:</Text>
                  <Text>{routeInfo.origin}</Text>
                </Space>
              </Col>
              <Col span={24}>
                <Space>
                  <SwapOutlined style={{ color: "#722ed1", fontSize: 20 }} />
                  <Text strong>Destino:</Text>
                  <Text>{routeInfo.destination}</Text>
                </Space>
              </Col>
            </Row>
          </Card>
        )}
      </div>
  );
};

export default MapView;
