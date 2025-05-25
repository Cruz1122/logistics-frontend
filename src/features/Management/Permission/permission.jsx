import React, { useState, useEffect } from "react";
import "./permission.css";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import CreatePermissionModal from "./crud/create";
import EditPermissionModal from "./crud/edit";
import DeletePermissionModal from "./crud/delete";
import {
  getAllPermissions,
  createPermission,
  updatePermission,
  deletePermission as apiDeletePermission,
} from "../../../api/permission";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FullScreenLoader } from "../../../App";

const PERMISSIONS_PER_PAGE = 5;

const Permission = () => {
  const [permissions, setPermissions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editPermission, setEditPermission] = useState(null);
  const [deletePermission, setDeletePermission] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPermissions = async () => {
    try {
      setLoading(true);
      const rawPermissions = await getAllPermissions();
      const mappedPermissions = rawPermissions.map((permission) => ({
        id: permission.id,
        name: permission.name,
        description: permission.description,
      }));
      setPermissions(mappedPermissions);
    } catch (error) {
      toast.error("Error fetching permissions");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  const handleCreate = async (newPermissionData) => {
    try {
      setLoading(true);
      await createPermission(newPermissionData);
      await fetchPermissions();
      setShowCreateModal(false);
      toast.success("Permission created successfully");
    } catch (error) {
      toast.error("Error creating permission");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (updatedPermissionData) => {
    try {
      setLoading(true);
      await updatePermission(editPermission.id, updatedPermissionData);
      await fetchPermissions();
      setEditPermission(null);
      toast.success("Permission updated successfully");
    } catch (error) {
      toast.error("Error updating permission");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (permissionToDelete) => {
    try {
      setLoading(true);
      await apiDeletePermission(permissionToDelete.id);
      await fetchPermissions();
      setDeletePermission(null);
      setCurrentPage(1);
      toast.success("Permission deleted successfully");
    } catch (error) {
      toast.error("Error deleting permission");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return <FullScreenLoader />;
  }

  return (
    <div className="permission-container">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="permission-controls">
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
        <table className="permission-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedPermissions.length > 0 ? (
              paginatedPermissions.map((permission) => (
                <tr key={permission.id} className="permission-row">
                  <td>{permission.name}</td>
                  <td>{permission.description}</td>
                  <td>
                    <FaEdit
                      className="edit-btn"
                      onClick={() => setEditPermission(permission)}
                    />
                    <FaTrash
                      className="delete-btn"
                      onClick={() => setDeletePermission(permission)}
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
                  No permissions found.
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
        <CreatePermissionModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreate}
          loading={loading}
        />
      )}
      {editPermission && (
        <EditPermissionModal
          permission={editPermission}
          onClose={() => setEditPermission(null)}
          onSave={handleUpdate}
          loading={loading}
        />
      )}
      {deletePermission && (
        <DeletePermissionModal
          permission={deletePermission}
          onClose={() => setDeletePermission(null)}
          onDelete={handleDelete}
          loading={loading}
        />
      )}
    </div>
  );
};

export default Permission;
