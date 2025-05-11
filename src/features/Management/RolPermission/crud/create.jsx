import React, { useState } from "react";
import "./modal.css";

const CreateRolPermissionModal = ({ onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    roleName: "",
    permissionName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(formData); // Esta función se define en el componente padre
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
