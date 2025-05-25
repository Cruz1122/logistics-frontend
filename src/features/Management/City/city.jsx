import React, { useState, useEffect } from "react";
import "./city.css";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";

import CreateCityModal from "./crud/create";
import EditCityModal from "./crud/edit";
import DeleteCityModal from "./crud/delete";

import {
  getAllCities,
  createCity,
  updateCity,
  deleteCity as apiDeleteCity,
} from "../../../api/city";

import { getAllStates } from "../../../api/state";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FullScreenLoader } from "../../../App";

const CITIES_PER_PAGE = 5;

const City = () => {
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editCity, setEditCity] = useState(null);
  const [deleteCity, setDeleteCity] = useState(null);
  const [loading, setLoading] = useState(false);

  // Carga inicial combinada
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const [statesRes, citiesRes] = await Promise.all([
          getAllStates(),
          getAllCities(),
        ]);

        setStates(statesRes);

        // Mapear ciudades con nombre de estado
        const mappedCities = citiesRes.map((city) => {
          const state = statesRes.find((s) => s.id === city.stateId);
          return {
            id: city.id,
            name: city.name,
            stateId: city.stateId,
            stateName: state ? state.name : "Unknown",
          };
        });

        setCities(mappedCities);
      } catch (error) {
        console.error("Error loading initial data:", error);
        toast.error("Error loading initial data");
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Función para recargar las ciudades con nombres de estados actualizados
  const fetchCities = async () => {
    try {
      setLoading(true);
      const rawCities = await getAllCities();
      const mappedCities = rawCities.map((city) => {
        const state = states.find((s) => s.id === city.stateId);
        return {
          id: city.id,
          name: city.name,
          stateId: city.stateId,
          stateName: state ? state.name : "Unknown",
        };
      });
      setCities(mappedCities);
    } catch (error) {
      toast.error("Error fetching cities");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (newCityData) => {
    try {
      setLoading(true);
      await createCity(newCityData);
      await fetchCities();
      setShowCreateModal(false);
      toast.success("City created successfully");
    } catch (error) {
      toast.error("Error creating city");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (updatedCityData) => {
    try {
      setLoading(true);
      await updateCity(editCity.id, updatedCityData);
      await fetchCities();
      setEditCity(null);
      toast.success("City updated successfully");
    } catch (error) {
      toast.error("Error updating city");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (cityToDelete) => {
    try {
      setLoading(true);
      await apiDeleteCity(cityToDelete);
      await fetchCities();
      setDeleteCity(null);
      setCurrentPage(1);
      toast.success("City deleted successfully");
    } catch (error) {
      toast.error("Error deleting city");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCities.length / CITIES_PER_PAGE);
  const startIndex = (currentPage - 1) * CITIES_PER_PAGE;
  const paginatedCities = filteredCities.slice(
    startIndex,
    startIndex + CITIES_PER_PAGE
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
    <div className="city-container">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="city-controls">
        <div className="search-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Search cities..."
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
        <table className="city-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>State</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCities.length > 0 ? (
              paginatedCities.map((city) => (
                <tr key={city.id} className="city-row">
                  <td>{city.name}</td>
                  <td>{city.stateName}</td>
                  <td>
                    <FaEdit
                      className="edit-btn"
                      onClick={() => setEditCity(city)}
                    />
                    <FaTrash
                      className="delete-btn"
                      onClick={() => setDeleteCity(city)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  style={{ textAlign: "center", padding: "1rem" }}
                >
                  No cities found.
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
        <CreateCityModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreate}
          loading={loading}
          states={states}
        />
      )}
      {editCity && (
        <EditCityModal
          city={editCity}
          onClose={() => setEditCity(null)}
          onSave={handleUpdate}
          loading={loading}
          states={states}
        />
      )}
      {deleteCity && (
        <DeleteCityModal
          city={deleteCity}
          onClose={() => setDeleteCity(null)}
          onDelete={handleDelete}
          loading={loading}
        />
      )}
    </div>
  );
};

export default City;
