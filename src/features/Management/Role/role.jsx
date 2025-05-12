import React, { useState, useEffect } from "react";
import "./role.css";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import CreateRoleModal from "./crud/create";
import EditRoleModal from "./crud/edit";
import DeleteRoleModal from "./crud/delete";
import { getAllRoles } from "../../../api/role";

const ROLES_PER_PAGE = 5;

const Role = () => {
  const [roles, setRoles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editRole, setEditRole] = useState(null);
  const [deleteRole, setDeleteRole] = useState(null);

  useEffect(() => {
    const fetchRoles = async () => {
      const rawRoles = await getAllRoles();

      const mappedRoles = rawRoles.map((role) => ({
        id: role.id,
        name: role.name,
        description: role.description,
        createdAt: role.createdAt,
        updatedAt: role.updatedAt,
      }));

      setRoles(mappedRoles);
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

  return (
    <div className="role-container">
      <div className="role-controls">
        <div className="search-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reiniciar a la primera página en nueva búsqueda
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
                  onClick={() => setDeleteRole(role)}
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

      {/* Pagination controls */}
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
        <CreateRoleModal onClose={() => setShowCreateModal(false)} />
      )}
      {editRole && (
        <EditRoleModal role={editRole} onClose={() => setEditRole(null)} />
      )}
      {deleteRole && (
        <DeleteRoleModal
          role={deleteRole}
          onClose={() => setDeleteRole(null)}
        />
      )}
    </div>
  );
};

export default Role;
