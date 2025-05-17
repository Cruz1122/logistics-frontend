import React, { useState, useEffect } from "react";
import "./rolpermission.css";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import CreateRolPermissionModal from "./crud/create";
import EditRolPermissionModal from "./crud/edit";
import DeleteRolPermissionModal from "./crud/delete";
import { getAllRolPermissions } from "../../../api/rolpermission";
import { MdCheckCircle, MdCancel } from "react-icons/md";

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
        crear: rolPermission.crear,
        listar: rolPermission.listar,
        editar: rolPermission.editar,
        eliminar: rolPermission.eliminar,
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

      <table className="rolpermission-table">
        <thead>
          <tr>
            <th>Role Name</th>
            <th>Permission Name</th>
            <th>Read</th>
            <th>Create</th>
            <th>Edit</th>
            <th>Delete</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedRolPermissions.map((rolPermission, index) => (
            <tr key={index} className="rolpermission-row">
              <td>{rolPermission.roleName}</td>
              <td>{rolPermission.permissionName}</td>
              <td>
                {rolPermission.listar ? (
                  <MdCheckCircle size={24} color="#5edd60" />
                ) : (
                  <MdCancel size={24} color="red" />
                )}
              </td>
              <td>
                {rolPermission.crear ? (
                  <MdCheckCircle size={24} color="#5edd60" />
                ) : (
                  <MdCancel size={24} color="red" />
                )}
              </td>
              <td>
                {rolPermission.editar ? (
                  <MdCheckCircle size={24} color="#5edd60" />
                ) : (
                  <MdCancel size={24} color="red" />
                )}
              </td>
              <td>
                {rolPermission.eliminar ? (
                  <MdCheckCircle size={24} color="#5edd60" />
                ) : (
                  <MdCancel size={24} color="red" />
                )}
              </td>
              <td>
                <FaEdit
                  className="edit-btn"
                  onClick={() => setEditRolPermission(rolPermission)}
                />
                <FaTrash
                  className="delete-btn"
                  onClick={() => setDeleteRolPermission(rolPermission)}
                />
              </td>
            </tr>
          ))}
          {paginatedRolPermissions.length === 0 && (
            <tr>
              <td colSpan="7" style={{ textAlign: "center", padding: "1rem" }}>
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

      {/* Modales */}
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
