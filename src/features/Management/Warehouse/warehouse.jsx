import React, { useState, useEffect } from "react";
import "./warehouse.css";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";

import CreateWarehouseModal from "./crud/create";
import EditWarehouseModal from "./crud/edit";
import DeleteWarehouseModal from "./crud/delete";

import {
  getAllWarehouses,
  createWarehouse,
  updateWarehouse,
  deleteWarehouse as apiDeleteWarehouse,
} from "../../../api/warehouse";

import { getAllCities } from "../../../api/city";
import { getUserByID, getUserIdFromToken } from "../../../api/user";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { FullScreenLoader } from "../../../App";

const WAREHOUSES_PER_PAGE = 5;

const Warehouse = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [cities, setCities] = useState([]);
  const [usersMap, setUsersMap] = useState(new Map());
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editWarehouse, setEditWarehouse] = useState(null);
  const [deleteWarehouse, setDeleteWarehouse] = useState(null);
  const [loading, setLoading] = useState(false);
  const roleId = useSelector((state) => state.auth.rolId);

  // Cargar ciudades, almacenes y usuarios relacionados EN PARALELO y cachear usuarios
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Cargar ciudades y almacenes
        const [citiesRes, warehousesRes] = await Promise.all([
          getAllCities(),
          getAllWarehouses(),
        ]);
        const sortedCities = citiesRes.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setCities(sortedCities);

        // Filtrar almacenes si es manager
        const MANAGER_ROLE_ID = "bab8aee4-0d03-4fc8-94a3-2118b3b4ea69";
        const userId = getUserIdFromToken();

        const filteredWarehouses =
          roleId === MANAGER_ROLE_ID && userId
            ? warehousesRes.filter((wh) => wh.managerId === userId)
            : warehousesRes;

        // Extraer IDs únicos de managers para cargar usuarios solo una vez
        const uniqueManagerIds = [
          ...new Set(
            filteredWarehouses.map((w) => w.managerId).filter(Boolean)
          ),
        ];

        // Cargar usuarios en paralelo
        const usersArray = await Promise.all(
          uniqueManagerIds.map((id) => getUserByID(id).catch(() => null))
        );

        // Crear un mapa de usuarios por ID
        const usersMapTemp = new Map();
        usersArray.forEach((user) => {
          if (user) usersMapTemp.set(user.id, user);
        });
        setUsersMap(usersMapTemp);

        // Mapear almacenes con nombres de ciudad y manager
        const mappedWarehouses = filteredWarehouses.map((wh) => {
          const city = sortedCities.find((c) => c.id === wh.cityId);
          const manager = usersMapTemp.get(wh.managerId);
          return {
            ...wh,
            cityName: city ? city.name : "Unknown",
            managerName: manager
              ? `${manager.name} ${manager.lastName}`
              : "Unknown",
          };
        });

        setWarehouses(mappedWarehouses);
      } catch (error) {
        toast.error("Error loading data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [roleId]);

  // Refrescar almacenes y usuarios sin recargar ciudades
  const fetchWarehouses = async () => {
    try {
      setLoading(true);
      const MANAGER_ROLE_ID = "bab8aee4-0d03-4fc8-94a3-2118b3b4ea69";
      const userId = getUserIdFromToken();

      const warehousesRes = await getAllWarehouses();

      const filteredWarehouses =
        roleId === MANAGER_ROLE_ID && userId
          ? warehousesRes.filter((wh) => wh.managerId === userId)
          : warehousesRes;

      // Obtener IDs únicos de managers
      const uniqueManagerIds = [
        ...new Set(filteredWarehouses.map((w) => w.managerId).filter(Boolean)),
      ];

      // Cargar usuarios solo si no están en el mapa actual
      const missingUserIds = uniqueManagerIds.filter((id) => !usersMap.has(id));
      const newUsers = await Promise.all(
        missingUserIds.map((id) => getUserByID(id).catch(() => null))
      );
      const newUsersMap = new Map(usersMap);
      newUsers.forEach((user) => {
        if (user) newUsersMap.set(user.id, user);
      });
      setUsersMap(newUsersMap);

      // Mapear almacenes con nombres
      const mappedWarehouses = filteredWarehouses.map((wh) => {
        const city = cities.find((c) => c.id === wh.cityId);
        const manager = newUsersMap.get(wh.managerId);
        return {
          ...wh,
          cityName: city ? city.name : "Unknown",
          managerName: manager
            ? `${manager.name} ${manager.lastName}`
            : "Unknown",
        };
      });

      setWarehouses(mappedWarehouses);
    } catch (error) {
      toast.error("Error fetching warehouses");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (newWarehouseData) => {
    try {
      setLoading(true);
      await createWarehouse(newWarehouseData);
      await fetchWarehouses();
      setShowCreateModal(false);
      toast.success("Warehouse created");
    } catch (error) {
      toast.error("Error creating warehouse");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (updatedData) => {
    try {
      setLoading(true);
      await updateWarehouse(editWarehouse.id, updatedData);
      await fetchWarehouses();
      setEditWarehouse(null);
      toast.success("Warehouse updated");
    } catch (error) {
      toast.error("Error updating warehouse");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (warehouseToDelete) => {
    try {
      setLoading(true);
      await apiDeleteWarehouse(warehouseToDelete);
      await fetchWarehouses();
      setDeleteWarehouse(null);
      setCurrentPage(1);
      toast.success("Warehouse deleted");
    } catch (error) {
      toast.error("Error deleting warehouse");
    } finally {
      setLoading(false);
    }
  };

  const filteredWarehouses = warehouses.filter((wh) =>
    wh.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredWarehouses.length / WAREHOUSES_PER_PAGE);
  const startIndex = (currentPage - 1) * WAREHOUSES_PER_PAGE;
  const paginatedWarehouses = filteredWarehouses.slice(
    startIndex,
    startIndex + WAREHOUSES_PER_PAGE
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) {
    return <FullScreenLoader />;
  }

  return (
    <div className="warehouse-container">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="warehouse-controls">
        <div className="search-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Search warehouses..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          <button className="search-btn">
            <FaSearch />
          </button>
        </div>
        <button className="create-btn" onClick={() => setShowCreateModal(true)}>
          CREATE +
        </button>
      </div>

      <div className="table-wrapper">
        <table className="warehouse-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>City</th>
              <th>Manager</th>
              <th>Address</th>
              <th>Postal Code</th>
              <th>
                Capacity m<sup>2</sup>
              </th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedWarehouses.length > 0 ? (
              paginatedWarehouses.map((wh) => (
                <tr key={wh.id}>
                  <td>{wh.id}</td>
                  <td>{wh.name}</td>
                  <td>{wh.cityName}</td>
                  <td>{wh.managerName}</td>
                  <td>{wh.address}</td>
                  <td>{wh.postalCode}</td>
                  <td>{wh.capacityM2}</td>
                  <td>{wh.status}</td>
                  <td>
                    <FaEdit
                      onClick={() => setEditWarehouse(wh)}
                      className="edit-btn"
                    />
                    <FaTrash
                      onClick={() => setDeleteWarehouse(wh)}
                      className="delete-btn"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="9"
                  style={{ textAlign: "center", padding: "1rem" }}
                >
                  No warehouses found.
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

      {showCreateModal && (
        <CreateWarehouseModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreate}
          loading={loading}
          cities={cities}
        />
      )}
      {editWarehouse && (
        <EditWarehouseModal
          warehouse={editWarehouse}
          onClose={() => setEditWarehouse(null)}
          onSave={handleUpdate}
          loading={loading}
          cities={cities}
        />
      )}
      {deleteWarehouse && (
        <DeleteWarehouseModal
          warehouse={deleteWarehouse}
          onClose={() => setDeleteWarehouse(null)}
          onDelete={handleDelete}
          loading={loading}
        />
      )}
    </div>
  );
};

export default Warehouse;
