import React, { useState, useEffect } from "react";
import "./permission.css";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import CreatePermissionModal from "./crud/create";
import EditPermissionModal from "./crud/edit";
import DeletePermissionModal from "./crud/delete";
import { getAllPermissions } from "../../../api/permission"; 

const PERMISSIONS_PER_PAGE = 5;

const Permission = () => {
  const [permissions, setPermissions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editPermission, setEditPermission] = useState(null);
  const [deletePermission, setDeletePermission] = useState(null);

  useEffect(() => {
    const fetchPermissions = async () => {
      const rawPermissions = await getAllPermissions();

      const mappedPermissions = rawPermissions.map((permission) => ({
        id: permission.id,
        name: permission.name,
        description: permission.description,
      }));

      setPermissions(mappedPermissions);
    };

    fetchPermissions();
  }, []);

  const filteredPermissions = permissions.filter((permission) =>
    Object.values(permission)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(
    filteredPermissions.length / PERMISSIONS_PER_PAGE
  );
  const startIndex = (currentPage - 1) * PERMISSIONS_PER_PAGE;
  const paginatedPermissions = filteredPermissions.slice(
    startIndex,
    startIndex + PERMISSIONS_PER_PAGE
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="permission-container">
      <div className="permission-controls">
        <div className="search-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to the first page on a new search
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

      <table className="permission-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedPermissions.map((permission, index) => (
            <tr key={index} className="permission-row">
              <td>{permission.id}</td>
              <td>{permission.name}</td>
              <td>{permission.description}</td>
              <td className="icon-actions">
                <button
                  className="icon-btn"
                  onClick={() => setEditPermission(permission)}
                >
                  <FaEdit />
                </button>
                <button
                  className="icon-btn"
                  onClick={() => setDeletePermission(permission)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
          {paginatedPermissions.length === 0 && (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", padding: "1rem" }}>
                No permissions found.
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

      {/* Modals */}
      {showCreateModal && (
        <CreatePermissionModal onClose={() => setShowCreateModal(false)} />
      )}
      {editPermission && (
        <EditPermissionModal
          permission={editPermission}
          onClose={() => setEditPermission(null)}
        />
      )}
      {deletePermission && (
        <DeletePermissionModal
          permission={deletePermission}
          onClose={() => setDeletePermission(null)}
        />
      )}
    </div>
  );
};

export default Permission;
