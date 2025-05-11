import React, { useState, useEffect } from "react";
import "./rolpermission.css";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import CreateRolPermissionModal from "./crud/create";
import EditRolPermissionModal from "./crud/edit";
import DeleteRolPermissionModal from "./crud/delete";
import { getAllRolPermissions } from "../../../api/rolpermission";

const ROL_PERMISSIONS_PER_PAGE = 5;

const RolPermission = () => {
  const [rolPermissions, setRolPermissions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editRolPermission, setEditRolPermission] = useState(null);
  const [deleteRolPermission, setDeleteRolPermission] = useState(null);

  useEffect(() => {
    const fetchRolPermissions = async () => {
      const rawRolPermissions = await getAllRolPermissions();

      const mappedRolPermissions = rawRolPermissions.map((rolPermission) => ({
        id: rolPermission.id,
        roleName: rolPermission.role.name,
        permissionName: rolPermission.permission.name,
      }));

      setRolPermissions(mappedRolPermissions);
    };

    fetchRolPermissions();
  }, []);

  const filteredRolPermissions = rolPermissions.filter((rolPermission) =>
    Object.values(rolPermission)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(
    filteredRolPermissions.length / ROL_PERMISSIONS_PER_PAGE
  );
  const startIndex = (currentPage - 1) * ROL_PERMISSIONS_PER_PAGE;
  const paginatedRolPermissions = filteredRolPermissions.slice(
    startIndex,
    startIndex + ROL_PERMISSIONS_PER_PAGE
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="rolpermission-container">
      <div className="rolpermission-controls">
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

      <table className="rolpermission-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Role Name</th>
            <th>Permission Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedRolPermissions.map((rolPermission, index) => (
            <tr key={index} className="rolpermission-row">
              <td>{rolPermission.id}</td>
              <td>{rolPermission.roleName}</td>
              <td>{rolPermission.permissionName}</td>
              <td className="icon-actions">
                <button
                  className="icon-btn"
                  onClick={() => setEditRolPermission(rolPermission)}
                >
                  <FaEdit />
                </button>
                <button
                  className="icon-btn"
                  onClick={() => setDeleteRolPermission(rolPermission)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
          {paginatedRolPermissions.length === 0 && (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", padding: "1rem" }}>
                No role-permission relationships found.
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
        <CreateRolPermissionModal onClose={() => setShowCreateModal(false)} />
      )}
      {editRolPermission && (
        <EditRolPermissionModal
          rolPermission={editRolPermission}
          onClose={() => setEditRolPermission(null)}
        />
      )}
      {deleteRolPermission && (
        <DeleteRolPermissionModal
          rolPermission={deleteRolPermission}
          onClose={() => setDeleteRolPermission(null)}
        />
      )}
    </div>
  );
};

export default RolPermission;
