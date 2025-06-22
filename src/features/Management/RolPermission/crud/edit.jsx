import React, { useState, useEffect } from "react";
import "./modal.css";

const EditRolPermissionModal = ({
  rolPermission,
  roles = [],
  permissions = [],
  onClose,
  onSave,
  loading,
}) => {
  const [formData, setFormData] = useState({
    id: rolPermission.id || "",
    roleId: rolPermission.roleId || "",
    permissionId: rolPermission.permissionId || "",
    listar: rolPermission.listar || false,
    crear: rolPermission.crear || false,
    editar: rolPermission.editar || false,
    eliminar: rolPermission.eliminar || false,
  });

  useEffect(() => {
    setFormData({
      id: rolPermission.id || "",
      roleId: rolPermission.roleId || "",
      permissionId: rolPermission.permissionId || "",
      listar: rolPermission.listar || false,
      crear: rolPermission.crear || false,
      editar: rolPermission.editar || false,
      eliminar: rolPermission.eliminar || false,
    });
  }, [rolPermission]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit} className="modal-form">
        <h2>Edit Role-Permission Relationship</h2>

        <label>
          Role:
          <select
            name="roleId"
            value={formData.roleId}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select a role
            </option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
            disabled={loading}
          </select>
        </label>

        <label>
          Permission:
          <select
            name="permissionId"
            value={formData.permissionId}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select a permission
            </option>
            {permissions.map((perm) => (
              <option key={perm.id} value={perm.id}>
                {perm.name}
              </option>
            ))}
            disabled={loading}
          </select>
        </label>

        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              name="listar"
              checked={formData.listar}
              onChange={handleChange}
              disabled={loading}
            />
            Read
          </label>

          <label>
            <input
              type="checkbox"
              name="crear"
              checked={formData.crear}
              onChange={handleChange}
              disabled={loading}
            />
            Create
          </label>

          <label>
            <input
              type="checkbox"
              name="editar"
              checked={formData.editar}
              onChange={handleChange}
              disabled={loading}
            />
            Edit
          </label>

          <label>
            <input
              type="checkbox"
              name="eliminar"
              checked={formData.eliminar}
              onChange={handleChange}
              disabled={loading}
            />
            Delete
          </label>
        </div>

        <div className="modal-actions">
          <button type="submit" className="save-btn" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="cancel-btn"
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRolPermissionModal;
