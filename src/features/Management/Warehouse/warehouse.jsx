import React, { useState, useEffect } from "react";
import "./warehouse.css"; // Asegúrate de crear o adaptar este archivo
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
import { getUserByID } from "../../../api/user";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WAREHOUSES_PER_PAGE = 5;

const Warehouse = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editWarehouse, setEditWarehouse] = useState(null);
  const [deleteWarehouse, setDeleteWarehouse] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCities = async () => {
    try {
      const res = await getAllCities();
      const sortedCities = res.sort((a, b) => a.name.localeCompare(b.name));
      setCities(sortedCities);
    } catch (error) {
      toast.error("Error fetching cities");
    }
  };

  const fetchWarehouses = async () => {
    try {
      const rawWarehouses = await getAllWarehouses();
      const mappedWarehouses = await Promise.all(
        rawWarehouses.map(async (wh) => {
          const city = cities.find((c) => c.id === wh.cityId);
          let managerName = "Unknown";
          try {
            const user = await getUserByID(wh.managerId);
            managerName = `${user.name} ${user.lastName}`;
          } catch {
            managerName = "Unknown";
          }

          return {
            ...wh,
            cityName: city ? city.name : "Unknown",
            managerName,
          };
        })
      );
      setWarehouses(mappedWarehouses);
    } catch (error) {
      toast.error("Error fetching warehouses");
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  useEffect(() => {
    if (cities.length > 0) {
      fetchWarehouses();
    }
  }, [cities]);

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
        <button
          className="create-btn"
          onClick={() => setShowCreateModal(true)}
        >
          CREATE +
        </button>
      </div>

      <table className="warehouse-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>City</th>
            <th>Manager</th>
            <th>Address</th>
            <th>Postal Code</th>
            <th>Capacity m<sup>2</sup></th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedWarehouses.map((wh) => (
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
          ))}
          {paginatedWarehouses.length === 0 && (
            <tr>
              <td colSpan="9" style={{ textAlign: "center", padding: "1rem" }}>
                No warehouses found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

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

      {/* Modales */}
      {showCreateModal && (
        <CreateWarehouseModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreate}
          loading={loading}
          cities={cities}
          // Le pasamos cities para seleccionar cityId
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
