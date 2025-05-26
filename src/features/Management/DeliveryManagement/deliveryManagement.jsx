import React, { useEffect, useState } from "react";
import { FullScreenLoader } from "../../../App";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./deliveryManagement.css";
import { getAllPersonDelivery } from "../../../api/deliveryperson";
import { getUserByID, updateUser } from "../../../api/user";
import { getCityById } from "../../../api/city";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  UserOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const DeliveryManager = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterState, setFilterState] = useState("");
  const [filterCity, setFilterCity] = useState("");
  const [filterTodayOrders, setFilterTodayOrders] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const fetchData = async () => {
    try {
      setLoading(true);
      const rawDeliveries = await getAllPersonDelivery();

      const enriched = await Promise.all(
        rawDeliveries.map(async (delivery) => {
          try {
            const user = await getUserByID(delivery.idUser);
            const cityData = await getCityById(user.cityId);
            const today = new Date().toISOString().split("T")[0];

            const totalOrders = delivery.orders.length;
            const todayOrders = delivery.orders.filter((order) =>
              order.estimatedDeliveryTime?.startsWith(today)
            ).length;

            return {
              id: delivery.id,
              idUser: user.id,
              name: `${user.name} ${user.lastName}`,
              phone: user.phone,
              city: cityData.name,
              state: cityData.state.name,
              isActive: user.isActive,
              totalOrders,
              todayOrders,
            };
          } catch (innerErr) {
            console.error("Error processing delivery person:", innerErr);
            return null;
          }
        })
      );

      setDeliveries(enriched.filter((d) => d !== null));
    } catch (err) {
      console.error("Error loading delivery people:", err);
      toast.error("Error loading delivery data");
    } finally {
      setLoading(false);
    }
  };

  const toggleActive = async (idUser, currentIsActive) => {
    try {
      const userData = await getUserByID(idUser);
      userData.isActive = !currentIsActive;
      await updateUser(idUser, userData);

      setDeliveries((prev) =>
        prev.map((d) =>
          d.idUser === idUser ? { ...d, isActive: !currentIsActive } : d
        )
      );

      toast.success(
        `Usuario ${!currentIsActive ? "activado" : "desactivado"} correctamente`
      );
    } catch (error) {
      console.error("Error actualizando el estado del usuario:", error);
      toast.error("Error al actualizar estado del usuario");
    }
  };

  const clearFilters = () => {
    setFilterState("");
    setFilterCity("");
    setFilterTodayOrders(false);
    setSearchTerm("");
    setCurrentPage(1);
  };

  const filteredCities = filterState
    ? [
        ...new Set(
          deliveries.filter((d) => d.state === filterState).map((d) => d.city)
        ),
      ]
    : [...new Set(deliveries.map((d) => d.city))];

  useEffect(() => {
    setFilterCity("");
    setCurrentPage(1);
  }, [filterState]);

  const filteredDeliveries = deliveries.filter((d) => {
    const matchesState = !filterState || d.state === filterState;
    const matchesCity = !filterCity || d.city === filterCity;
    const matchesTodayOrders = !filterTodayOrders || d.todayOrders > 0;

    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      d.name.toLowerCase().includes(searchLower) ||
      d.phone.toLowerCase().includes(searchLower);

    return matchesState && matchesCity && matchesTodayOrders && matchesSearch;
  });

  const totalPages = Math.ceil(filteredDeliveries.length / itemsPerPage);
  const currentDeliveries = filteredDeliveries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <FullScreenLoader />;

  return (
    <div className="delivery-manager">
      <h2 class="delivery-title">Delivery Personnel</h2>

      <div className="delivery-controls">
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search by name or phone"
            className="search-input"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          <button className="search-btn">
            <SearchOutlined />
          </button>
        </div>

        <select
          value={filterState}
          onChange={(e) => setFilterState(e.target.value)}
        >
          <option value="">All States</option>
          {[...new Set(deliveries.map((d) => d.state))].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <select
          value={filterCity}
          onChange={(e) => setFilterCity(e.target.value)}
          disabled={!filterState}
        >
          <option value="">All Cities</option>
          {filteredCities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <label>
          <input
            type="checkbox"
            checked={filterTodayOrders}
            onChange={(e) => {
              setFilterTodayOrders(e.target.checked);
              setCurrentPage(1);
            }}
          />
          With Orders Today
        </label>

        <button className="create-btn" onClick={clearFilters}>
          Clear Filters
        </button>
      </div>

      <div className="table-wrapper">
        <table className="delivery-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>IdUser</th>
              <th>Name</th>
              <th>Phone</th>
              <th>City</th>
              <th>State</th>
              <th>Status</th>
              <th># Orders</th>
              <th>Today's Orders</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentDeliveries.length > 0 ? (
              currentDeliveries.map((d) => (
                <tr key={d.id}>
                  <td>{d.id}</td>
                  <td>{d.idUser}</td>
                  <td>
                    <UserOutlined /> {d.name}
                  </td>
                  <td>{d.phone}</td>
                  <td>{d.city}</td>
                  <td>{d.state}</td>
                  <td>
                    {d.isActive ? (
                      <span className="badge-status active">
                        <CheckCircleOutlined className="icon" />
                        Activo
                      </span>
                    ) : (
                      <span className="badge-status inactive">
                        <CloseCircleOutlined className="icon" />
                        Inactivo
                      </span>
                    )}
                  </td>
                  <td>{d.totalOrders}</td>
                  <td>{d.todayOrders}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="action-btn toggle-btn"
                        onClick={() => toggleActive(d.idUser, d.isActive)}
                      >
                        {d.isActive ? "Desactivar" : "Activar"}
                      </button>
                      <button
                        className={`action-btn track-btn ${
                          !d.isActive ? "disabled" : ""
                        }`}
                        disabled={!d.isActive}
                        onClick={() => console.log("Track delivery", d.id)}
                      >
                        Track
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ⬅ Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next ➡
          </button>
        </div>
      )}
    </div>
  );
};

export default DeliveryManager;
