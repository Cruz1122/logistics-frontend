import React, { useState, useEffect } from "react";
import "./rolpermission.css";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import CreateRolPermissionModal from "./crud/create";
import EditRolPermissionModal from "./crud/edit";
import DeleteRolPermissionModal from "./crud/delete";
import {
  getAllRolPermissions,
  createRolPermission,
  updateRolPermission,
  deleteRolPermission as deleteRolPermissionApi,
} from "../../../api/rolpermission";
import { getAllRoles } from "../../../api/role";
import { getAllPermissions } from "../../../api/permission";
import { MdCheckCircle, MdCancel } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import { FullScreenLoader } from "../../../App";

const ROL_PERMISSIONS_PER_PAGE = 5;

const RolPermission = () => {
  const [rolPermissions, setRolPermissions] = useState([]);
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editRolPermission, setEditRolPermission] = useState(null);
  const [deleteRolPermission, setDeleteRolPermission] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [rawRolPermissions, rawRoles, rawPermissions] = await Promise.all(
          [getAllRolPermissions(), getAllRoles(), getAllPermissions()]
        );

        const mappedRolPermissions = rawRolPermissions.map((rp) => ({
          id: rp.id,
          roleId: rp.role.id,
          roleName: rp.role.name,
          permissionId: rp.permission.id,
          permissionName: rp.permission.name,
          crear: rp.crear,
          listar: rp.listar,
          editar: rp.editar,
          eliminar: rp.eliminar,
        }));

        setRolPermissions(mappedRolPermissions);
        setRoles(rawRoles);
        setPermissions(rawPermissions);
      } catch (error) {
        toast.error("Error loading data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredRolPermissions = rolPermissions.filter((rp) =>
    Object.values(rp).join(" ").toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleCreate = async (newRolPermission) => {
    try {
      setLoading(true);
      const { rolePermission } = await createRolPermission(newRolPermission);

      const roleSelected = roles.find((r) => r.id === rolePermission.roleId);
      const permissionSelected = permissions.find(
        (p) => p.id === rolePermission.permissionId
      );

      setRolPermissions((prev) => [
        ...prev,
        {
          ...rolePermission,
          roleName: roleSelected?.name || "Unknown Role",
          permissionName: permissionSelected?.name || "Unknown Permission",
        },
      ]);

      setShowCreateModal(false);
      toast.success("Rol-Permission created successfully");
    } catch (error) {
      console.error("Error creating rol-permission:", error);
      toast.error("Error creating rol-permission");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (updatedRolPermission) => {
    try {
      setLoading(true);
      const { rolePermission } = await updateRolPermission(
        updatedRolPermission.id,
        updatedRolPermission
      );

      const roleSelected = roles.find((r) => r.id === rolePermission.roleId);
      const permissionSelected = permissions.find(
        (p) => p.id === rolePermission.permissionId
      );

      const updatedItem = {
        id: rolePermission.id,
        roleId: rolePermission.roleId,
        permissionId: rolePermission.permissionId,
        crear: rolePermission.crear,
        listar: rolePermission.listar,
        editar: rolePermission.editar,
        eliminar: rolePermission.eliminar,
        roleName: roleSelected?.name || "Unknown Role",
        permissionName: permissionSelected?.name || "Unknown Permission",
      };

      setRolPermissions((prev) =>
        prev.map((item) => (item.id === rolePermission.id ? updatedItem : item))
      );

      setEditRolPermission(null);
      toast.success("Rol-Permission updated successfully");
    } catch (error) {
      console.error("Error updating rol-permission:", error);
      toast.error("Error updating rol-permission");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await deleteRolPermissionApi(id);
      setRolPermissions((prev) => prev.filter((item) => item.id !== id));
      setDeleteRolPermission(null);
      setCurrentPage(1);
      toast.success("Rol-Permission deleted successfully");
    } catch (error) {
      console.error("Error deleting rol-permission:", error);
      toast.error("Error deleting rol-permission");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <FullScreenLoader />;
  }

  return (
    <div className="rolpermission-container">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="rolpermission-controls">
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
            {paginatedRolPermissions.length > 0 ? (
              paginatedRolPermissions.map((rp, index) => (
                <tr key={index} className="rolpermission-row">
                  <td>{rp.roleName}</td>
                  <td>{rp.permissionName}</td>
                  <td>
                    {rp.listar ? (
                      <MdCheckCircle color="#5edd60" size={24} />
                    ) : (
                      <MdCancel color="red" size={24} />
                    )}
                  </td>
                  <td>
                    {rp.crear ? (
                      <MdCheckCircle color="#5edd60" size={24} />
                    ) : (
                      <MdCancel color="red" size={24} />
                    )}
                  </td>
                  <td>
                    {rp.editar ? (
                      <MdCheckCircle color="#5edd60" size={24} />
                    ) : (
                      <MdCancel color="red" size={24} />
                    )}
                  </td>
                  <td>
                    {rp.eliminar ? (
                      <MdCheckCircle color="#5edd60" size={24} />
                    ) : (
                      <MdCancel color="red" size={24} />
                    )}
                  </td>
                  <td>
                    <FaEdit
                      className="edit-btn"
                      onClick={() => setEditRolPermission(rp)}
                    />
                    <FaTrash
                      className="delete-btn"
                      onClick={() => setDeleteRolPermission(rp)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  style={{ textAlign: "center", padding: "1rem" }}
                >
                  No role-permission relationships found.
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
        <CreateRolPermissionModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreate}
          roles={roles}
          permissions={permissions}
          loading={loading}
        />
      )}
      {editRolPermission && (
        <EditRolPermissionModal
          rolPermission={editRolPermission}
          onClose={() => setEditRolPermission(null)}
          onSave={handleEdit}
          roles={roles}
          permissions={permissions}
          loading={loading}
        />
      )}
      {deleteRolPermission && (
        <DeleteRolPermissionModal
          rolPermission={deleteRolPermission}
          onClose={() => setDeleteRolPermission(null)}
          onDelete={() => handleDelete(deleteRolPermission.id)}
          loading={loading}
        />
      )}
    </div>
  );
};

export default RolPermission;
