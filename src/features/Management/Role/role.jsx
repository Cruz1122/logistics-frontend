import React, { useState, useEffect } from "react";
import "./role.css";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import CreateRoleModal from "./crud/create";
import EditRoleModal from "./crud/edit";
import DeleteRoleModal from "./crud/delete";
import { getAllRoles, createRole, updateRole, deleteRole } from "../../../api/role";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ROLES_PER_PAGE = 5;

const Role = () => {
  const [roles, setRoles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editRole, setEditRole] = useState(null);
  const [roleToDelete, setRoleToDelete] = useState(null);
  const [loading, setLoading] = useState(false); // controla botón en modal

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const rawRoles = await getAllRoles();

        const mappedRoles = rawRoles.map((role) => ({
          id: role.id,
          name: role.name,
          description: role.description,
          createdAt: role.createdAt,
          updatedAt: role.updatedAt,
        }));

        setRoles(mappedRoles);
      } catch (error) {
        toast.error("Error fetching roles");
        console.error(error);
      }
    };

    fetchRoles();
  }, []);

  const filteredRoles = roles.filter((role) =>
    Object.values(role)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredRoles.length / ROLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ROLES_PER_PAGE;
  const paginatedRoles = filteredRoles.slice(
    startIndex,
    startIndex + ROLES_PER_PAGE
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Crear nuevo rol
  const handleCreateRole = async (roleData) => {
    try {
      setLoading(true);
      const newRole = await createRole(roleData);
      setRoles((prev) => [...prev, newRole]);
      setShowCreateModal(false);
      toast.success("Role created successfully");
    } catch (error) {
      toast.error("Error creating role");
      console.error("Error creating role:", error);
    } finally {
      setLoading(false);
    }
  };

  // Editar rol existente
  const handleSaveEditRole = async (updatedData) => {
    try {
      setLoading(true);
      const updatedRole = await updateRole(editRole.id, updatedData);
      setRoles((prev) =>
        prev.map((role) =>
          role.id === updatedRole.id ? updatedRole : role
        )
      );
      setEditRole(null);
      toast.success("Role updated successfully");
    } catch (error) {
      toast.error("Error updating role");
      console.error("Error updating role:", error);
    } finally {
      setLoading(false);
    }
  };

  // Eliminar rol
  const handleDeleteRole = async (role) => {
    try {
      setLoading(true);
      await deleteRole(role.id);
      setRoles((prev) => prev.filter((r) => r.id !== role.id));
      setRoleToDelete(null);
      setCurrentPage(1);
      toast.success("Role deleted successfully");
    } catch (error) {
      toast.error("Error deleting role");
      console.error("Error deleting role:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="role-container">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="role-controls">
        <div className="search-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Search..."
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
        <table className="role-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedRoles.map((role, index) => (
            <tr key={index} className="role-row">
              <td>{role.name}</td>
              <td>{role.description}</td>
              <td>
                <FaEdit
                  className="edit-btn"
                  onClick={() => setEditRole(role)}
                />
                <FaTrash
                  className="delete-btn"
                  onClick={() => setRoleToDelete(role)}
                />
              </td>
            </tr>
          ))}
          {paginatedRoles.length === 0 && (
            <tr>
              <td colSpan="3" style={{ textAlign: "center", padding: "1rem" }}>
                No roles found.
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
        <CreateRoleModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateRole}
          loading={loading}
        />
      )}
      {editRole && (
        <EditRoleModal
          role={editRole}
          onClose={() => setEditRole(null)}
          onSave={handleSaveEditRole}
          loading={loading}
        />
      )}
      {roleToDelete && (
        <DeleteRoleModal
          role={roleToDelete}
          onClose={() => setRoleToDelete(null)}
          onDelete={handleDeleteRole}
          loading={loading}
        />
      )}
    </div>
  );
};

export default Role;
