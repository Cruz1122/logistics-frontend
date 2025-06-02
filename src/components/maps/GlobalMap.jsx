import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import warehouseIcon from "../../assets/icons/warehouse.png";
import orderIcon from "../../assets/icons/order.png";
import deliveryIcon from "../../assets/icons/delivery.png";
import { Card, Typography, Row, Col, Space } from "antd";
import {
  DatabaseOutlined,
  ShoppingOutlined,
  CarOutlined,
} from "@ant-design/icons";
import { FullScreenLoader } from "../../App";

const { Title, Text } = Typography;

// Map container style
const containerStyle = { width: "100%", height: "82.4vh" };

// Default center for the map ~ Bogotá, Colombia
const defaultCenter = { lat: 4.65, lng: -74.05 };

const GlobalMap = () => {
  const location = useLocation(); // Get the location state
  const { deliveryId } = useParams(); // Get the deliveryId from the URL parameters

  // Extract orders, warehouses, and deliveries from the location flow state
  const {
    orders = [],
    warehouses = [],
    deliveries = [],
  } = location.state || {};

  // State to manage the center of the map
  const [center, setCenter] = useState(defaultCenter);

  // Load the Google Maps API
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey:
      import.meta.env.VITE_GOOGLE_MAPS_API_KEY ||
      "AIzaSyCh8r-3KBav3cRI6gRWWqrgAaHw1Qsg-nE",
  });

  useEffect(() => {
    if (!deliveryId) {
      // If no deliveryId is provided
      setCenter(defaultCenter);
      return;
    }

    const delivery = deliveries.find(
      (d) => `${d.deliveryPersonId}` === `${deliveryId}`
    );
    if (delivery?.lat && delivery?.lng) {
      // If a delivery with the given ID is found, set the map center to its coordinates
      setCenter({ lat: delivery.lat, lng: delivery.lng });
    } else {
      setCenter(defaultCenter);
    }
  }, [deliveryId, deliveries]);

  if (!isLoaded) return <FullScreenLoader />;

  // Function to create a marker icon
  const createIcon = (url) => ({
    url,
    scaledSize: new google.maps.Size(32, 32),
  });

  // Totals
  const totalWarehouses = warehouses.length;
  const totalOrders = orders.length;
  const totalDeliveries = deliveries.length;

  return (
    <div style={{ position: "relative", width: "100%", height: "82.4vh" }}>
      <GoogleMap mapContainerStyle={containerStyle} zoom={12} center={center}>
        {warehouses.map((wh, i) => (
          <Marker
            key={`wh-${i}`}
            position={{ lat: wh.lat, lng: wh.lng }}
            icon={createIcon(warehouseIcon)}
            title={`Warehouse #${wh.warehouseId}`}
          />
        ))}
        {orders.map((order, i) => (
          <Marker
            key={`order-${i}`}
            position={{ lat: order.lat, lng: order.lng }}
            icon={createIcon(orderIcon)}
            title={`Order #${order.orderId}`}
          />
        ))}
        {deliveries.map((del) => (
          <Marker
            key={`del-${del.deliveryPersonId}`}
            position={{ lat: del.lat, lng: del.lng }}
            icon={createIcon(deliveryIcon)}
            title={`Delivery #${del.deliveryPersonId}\nName: ${del.name}`}
          />
        ))}
      </GoogleMap>

      {/* Card con totales */}
      <Card
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          width: 280,
          zIndex: 10,
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          borderRadius: 8,
          backgroundColor: "white",
          opacity: 0.95,
        }}
        title={
          <Title level={4} style={{ margin: 0 }}>
            Summary
          </Title>
        }
      >
        <Row gutter={[12, 12]}>
          <Col span={24}>
            <Space>
              <DatabaseOutlined style={{ color: "#1890ff", fontSize: 20 }} />
              <Text strong>Total Warehouses:</Text>
              <Text>{totalWarehouses}</Text>
            </Space>
          </Col>
          <Col span={24}>
            <Space>
              <ShoppingOutlined style={{ color: "#52c41a", fontSize: 20 }} />
              <Text strong>Total Orders:</Text>
              <Text>{totalOrders}</Text>
            </Space>
          </Col>
          <Col span={24}>
            <Space>
              <CarOutlined style={{ color: "#fa541c", fontSize: 20 }} />
              <Text strong>Active Deliveries:</Text>
              <Text>{totalDeliveries}</Text>
            </Space>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default GlobalMap;
