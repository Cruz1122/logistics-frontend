import React, { useState } from "react";
import "./modal.css";

const EditRolPermissionModal = ({ rolPermission, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    roleName: rolPermission.roleName,
    permissionName: rolPermission.permissionName,
    listar: rolPermission.listar || false,
    crear: rolPermission.crear || false,
    editar: rolPermission.editar || false,
    eliminar: rolPermission.eliminar || false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Envía los datos actualizados al componente padre
    onClose();
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit} className="modal-form">
        <h2>Edit Role-Permission Relationship</h2>

        <label>
          Role Name:
          <input
            name="roleName"
            value={formData.roleName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Permission Name:
          <input
            name="permissionName"
            value={formData.permissionName}
            onChange={handleChange}
            required
          />
        </label>

        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              name="listar"
              checked={formData.listar}
              onChange={handleChange}
            />
            Read
          </label>

          <label>
            <input
              type="checkbox"
              name="crear"
              checked={formData.crear}
              onChange={handleChange}
            />
            Create
          </label>

          <label>
            <input
              type="checkbox"
              name="editar"
              checked={formData.editar}
              onChange={handleChange}
            />
            Edit
          </label>

          <label>
            <input
              type="checkbox"
              name="eliminar"
              checked={formData.eliminar}
              onChange={handleChange}
            />
            Delete
          </label>
        </div>

        <div className="modal-actions">
          <button type="submit" className="save-btn">
            Save
          </button>
          <button type="button" onClick={onClose} className="cancel-btn">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRolPermissionModal;
