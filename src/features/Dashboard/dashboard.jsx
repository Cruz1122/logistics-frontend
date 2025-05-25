import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { getUserPermissions, getUserIdFromToken } from "../../api/user";
import "react-toastify/dist/ReactToastify.css";
import {
  FaUser,
  FaUsersCog,
  FaKey,
  FaTasks,
  FaTags,
  FaTruck,
  FaCity,
  FaMap,
  FaWarehouse,
  FaQuestionCircle,
} from "react-icons/fa";
import "./dashboard.css";
import { FullScreenLoader } from "../../App";

const Dashboard = () => {
  const [permissions, setPermissions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPermissions = async () => {
      const userId = getUserIdFromToken();
      if (!userId) {
        toast.error("Sesión expirada o inválida. Inicia sesión de nuevo.");
        navigate("/signin");
        return;
      }
      const data = await getUserPermissions(userId);
      if (data && Array.isArray(data)) {
        // Filtrar para omitir permisos de Account Management
        const filtered = data.filter(
          (perm) =>
            !perm.name.toLowerCase().includes("account management") &&
            !perm.description.toLowerCase().includes("account management")
        );
        setPermissions(filtered);
      } else {
        toast.error("No se pudieron cargar los permisos del usuario");
      }
    };

    fetchPermissions();
  }, [navigate]);

  if (permissions.length === 0) {
    return <FullScreenLoader />;
  }

  const getIconForPermission = (name) => {
    const permissionName = name.toLowerCase();

    if (permissionName.includes("user")) return <FaUser size={40} />;
    if (
      permissionName.includes("role") &&
      !permissionName.includes("permission")
    )
      return <FaUsersCog size={40} />;
    if (
      permissionName.includes("role") &&
      permissionName.includes("permission")
    )
      return <FaKey size={40} />;
    if (permissionName.includes("permission")) return <FaTasks size={40} />;
    if (permissionName.includes("category")) return <FaTags size={40} />;
    if (permissionName.includes("supplier")) return <FaTruck size={40} />;
    if (permissionName.includes("state")) return <FaMap size={40} />;
    if (permissionName.includes("city")) return <FaCity size={40} />;
    if (permissionName.includes("warehouse")) return <FaWarehouse size={40} />;
    if (
      permissionName.includes("product") &&
      permissionName.includes("supplier")
    )
      return <FaTruck size={40} />;
    if (
      permissionName.includes("product") &&
      permissionName.includes("warehouse")
    )
      return <FaWarehouse size={40} />;
    if (
      permissionName.includes("product") &&
      permissionName.includes("movement")
    )
      return <FaTasks size={40} />;
    if (permissionName.includes("delivery")) return <FaTruck size={40} />;
    if (permissionName.includes("order")) return <FaTasks size={40} />;
    if (permissionName.includes("product")) return <FaTags size={40} />;

    return <FaQuestionCircle size={40} />;
  };

  const handleButtonClick = (permName) => {
    const permissionName = permName.toLowerCase();

    // Omitimos rutas relacionadas a Account Management
    if (permissionName.includes("account management")) {
      toast.info("Gestión de cuentas no disponible aquí");
      return;
    }

    let route = "";

    if (permissionName.includes("user")) {
      route = "/usersPanel";
    } else if (
      permissionName.includes("role") &&
      !permissionName.includes("permission")
    ) {
      route = "/rolesPanel";
    } else if (
      permissionName.includes("role") &&
      permissionName.includes("permission")
    ) {
      route = "/roleXpermissionPanel";
    } else if (
      permissionName.includes("product") &&
      permissionName.includes("supplier")
    ) {
      route = "/productSuppliersPanel";
    } else if (
      permissionName.includes("product") &&
      permissionName.includes("warehouse")
    ) {
      route = "/productWarehousesPanel";
    } else if (
      permissionName.includes("product") &&
      permissionName.includes("movement")
    ) {
      route = "/productWarehouseMovementsPanel";
    } else if (permissionName.includes("permission")) {
      route = "/permissionsPanel";
    } else if (permissionName.includes("category")) {
      route = "/categoriesPanel";
    } else if (permissionName.includes("supplier")) {
      route = "/suppliersPanel";
    } else if (permissionName.includes("state")) {
      route = "/statesPanel";
    } else if (permissionName.includes("city")) {
      route = "/citiesPanel";
    } else if (permissionName.includes("warehouse")) {
      route = "/warehousesPanel";
    } else if (permissionName.includes("product")) {
      route = "/productsPanel";
    } else if (permissionName.includes("delivery")) {
      route = "/deliveriesPanel";
    } else if (permissionName.includes("order")) {
      route = "/ordersPanel";
    } else {
      route = "/defaultPanel";
    }

    if (route) {
      navigate(route);
    } else {
      toast.info(`No hay ruta configurada para "${permName}"`);
    }
  };

  return (
    <div className="dashboard-container">
      <ToastContainer />

      <div className="dashboard-header">
        <h1 className="dashboard-title">Management Panel</h1>
        <p className="dashboard-subtitle" style={{ fontSize: "1.5rem" }}>
          Select an option to manage system resources.
        </p>
      </div>
      <div className="cards-grid">
        {permissions.map((perm) => (
          <div className="dashboard-card" key={perm.permissionId}>
            <div className="card-icon">{getIconForPermission(perm.name)}</div>
            <h3>{perm.name}</h3>
            <p>{perm.description}</p>
            <button
              className="card-button"
              onClick={() => handleButtonClick(perm.name)}
            >
              Manage
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
