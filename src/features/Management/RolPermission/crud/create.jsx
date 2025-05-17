import React, { useState } from "react";
import "./modal.css";

const CreateRolPermissionModal = ({ onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    roleName: "",
    permissionName: "",
    listar: false,
    crear: false,
    editar: false,
    eliminar: false,
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
    onCreate(formData); // Envía los datos al componente padre
    onClose();
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit} className="modal-form">
        <h2>Create Role-Permission Relationship</h2>

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
            Create
          </button>
          <button type="button" onClick={onClose} className="cancel-btn">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRolPermissionModal;
