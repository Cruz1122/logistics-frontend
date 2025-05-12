import React, { useState, useEffect } from "react";
import "./modal.css";

const EditUserModal = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    id: user.id,
    name: user.name,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    role: user.role, // Verifica que user.role sea el valor esperado
    roleId: user.roleId,
    verified: user.verified, // ya viene como booleano
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  });

  useEffect(() => {
    setFormData({
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      role: user.role, // Aquí asignamos correctamente el valor del rol
      roleId: user.roleId,
      verified: !!user.verified, // asegura que sea booleano
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }, [user]);

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
    onClose();
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit} className="modal-form">
        <h2>
          Edit User
        </h2>

        <div className="form-field">
          <label>ID</label>
          <input name="id" value={formData.id} readOnly disabled />
        </div>

        <div className="form-group">
          <div className="form-field">
            <label>Name</label>
            <input name="name" value={formData.name} onChange={handleChange} />
          </div>
          <div className="form-field">
            <label>Last name</label>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <div className="form-field">
            <label>Email</label>
            <input name="email" value={formData.email} readOnly disabled />
          </div>
          <div className="form-field">
            <label>Email verified</label>
            {formData.verified ? (
              <span
                style={{ color: "green", fontWeight: "bold", fontSize: 25 }}
              >
                ✔
              </span>
            ) : (
              <span style={{ color: "red", fontWeight: "bold", fontSize: 25 }}>
                ✖
              </span>
            )}
          </div>
        </div>

        <div className="form-field">
          <label>Phone</label>
          <input name="phone" value={formData.phone} onChange={handleChange} />
        </div>

        <div className="form-group">
          <div className="form-field">
            <label>Role</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="Admin">Admin</option>
              <option value="Delivery">Delivery</option>
              <option value="Dispatcher">Dispatcher</option>
              <option value="Manager">Manager</option> {/* Cambié el valor */}
              <option value="Guest">Guest</option> {/* Cambié el valor */}
            </select>
          </div>
          <div className="form-field">
            <label>Role ID</label>
            <input name="roleId" value={formData.roleId} readOnly disabled />
          </div>
        </div>

        <div className="form-group">
          <div className="form-field">
            <label>Created at</label>
            <input
              name="createdAt"
              value={formData.createdAt}
              readOnly
              disabled
            />
          </div>
          <div className="form-field">
            <label>Updated at</label>
            <input
              name="updatedAt"
              value={formData.updatedAt}
              readOnly
              disabled
            />
          </div>
        </div>

        <div className="modal-actions">
          <button type="button" onClick={onClose} className="cancel-btn">
            Cancel
          </button>
          <button type="submit" className="save-btn">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserModal;
