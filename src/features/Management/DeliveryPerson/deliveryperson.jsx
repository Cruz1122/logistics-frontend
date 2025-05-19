import React, { useState, useEffect } from "react";
import "./deliveryperson.css";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";

import CreatePersonDeliveryModal from "./crud/create";
import EditPersonDeliveryModal from "./crud/edit";
import DeletePersonDeliveryModal from "./crud/delete";

import {
  getAllPersonDelivery,
  createPersonDelivery,
  updatePersonDelivery,
  deletePersonDelivery as apiDeletePersonDelivery,
} from "../../../api/deliveryperson.js";

import { getAllUsers } from "../../../api/user"; // <-- Importa la función para traer usuarios

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PERSONS_PER_PAGE = 5;

const PersonDelivery = () => {
  const [persons, setPersons] = useState([]);
  const [users, setUsers] = useState([]); // <-- estado para usuarios
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editPerson, setEditPerson] = useState(null);
  const [deletePerson, setDeletePerson] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await getAllUsers();
      setUsers(res);
    } catch (error) {
      toast.error("Error fetching users");
    }
  };

  const fetchPersons = async () => {
    try {
      const data = await getAllPersonDelivery();

      // Aquí mapeamos para añadir el fullName del usuario
      const mapped = data.map((person) => {
        const user = users.find((u) => u.id === person.idUser);
        return {
          ...person,
          userFullName: user ? `${user.name} ${user.lastName}` : "Unknown user",
        };
      });

      setPersons(mapped);
    } catch (error) {
      toast.error("Error fetching delivery persons");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Cuando cambian los usuarios, recargamos personas para mapear con nombres
  useEffect(() => {
    if (users.length > 0) {
      fetchPersons();
    }
  }, [users]);

  const handleCreate = async (data) => {
    try {
      setLoading(true);
      await createPersonDelivery(data);
      await fetchPersons();
      setShowCreateModal(false);
      toast.success("Person created");
    } catch (error) {
      toast.error("Error creating person");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (data) => {
    try {
      setLoading(true);
      await updatePersonDelivery(editPerson.id, data);
      await fetchPersons();
      setEditPerson(null);
      toast.success("Person updated");
    } catch (error) {
      toast.error("Error updating person");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (person) => {
    try {
      setLoading(true);
      await apiDeletePersonDelivery(person);
      await fetchPersons();
      setDeletePerson(null);
      setCurrentPage(1);
      toast.success("Person deleted");
    } catch (error) {
      toast.error("Error deleting person");
    } finally {
      setLoading(false);
    }
  };

  const filteredPersons = persons.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPersons.length / PERSONS_PER_PAGE);
  const startIndex = (currentPage - 1) * PERSONS_PER_PAGE;
  const paginatedPersons = filteredPersons.slice(
    startIndex,
    startIndex + PERSONS_PER_PAGE
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="personDelivery-container">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="personDelivery-controls">
        <div className="search-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Search persons..."
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
        <table className="personDelivery-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>User Full Name</th> {/* <-- Aquí mostramos el nombre completo */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedPersons.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.latitude}</td>
                <td>{p.longitude}</td>
                <td>{p.userFullName}</td>
                <td>
                  <FaEdit
                    onClick={() => setEditPerson(p)}
                    className="edit-btn"
                  />
                  <FaTrash
                    onClick={() => setDeletePerson(p)}
                    className="delete-btn"
                  />
                </td>
              </tr>
            ))}
            {paginatedPersons.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "1rem" }}>
                  No persons found.
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

      {/* Modales */}
      {showCreateModal && (
        <CreatePersonDeliveryModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreate}
          loading={loading}
          users={users} // si necesitas usuarios en el modal para asignar
        />
      )}
      {editPerson && (
        <EditPersonDeliveryModal
          person={editPerson}
          onClose={() => setEditPerson(null)}
          onSave={handleUpdate}
          loading={loading}
          users={users} // si necesitas usuarios en el modal para asignar
        />
      )}
      {deletePerson && (
        <DeletePersonDeliveryModal
          person={deletePerson}
          onClose={() => setDeletePerson(null)}
          onDelete={handleDelete}
          loading={loading}
        />
      )}
    </div>
  );
};

export default PersonDelivery;
