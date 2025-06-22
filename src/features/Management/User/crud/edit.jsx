import React, { useState, useEffect } from "react";
import "./modal.css";

const EditUserModal = ({ user, onClose, onSave }) => {
  // Mapa de los roles a sus respectivos Role ID
  const roleNameToId = {
    Admin: "4d36f126-e3c0-4740-8ef0-215dbf71733f",
    Delivery: "efa6e130-69ef-4386-b035-fbb6f268c016",
    Dispatcher: "5208d160-41e8-40a1-a813-7fa601331b9e",
    Manager: "bab8aee4-0d03-4fc8-94a3-2118b3b4ea69",
    Guest: "2b406949-6340-4801-ac31-06449644a6a4",
  };

  const [formData, setFormData] = useState({
    id: user.id,
    name: user.name,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    role: user.role, // Verifica que user.role sea el valor esperado
    roleId: user.roleId,
    verified: user.verified, // ya viene como booleano
    isActive: user.isActive, // ← Agrega esto en ambos
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
      isActive: user.isActive, // ← Agrega esto en ambos

      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "role") {
      // Si el campo es "role", actualizamos el roleId automáticamente
      const newRoleId = roleNameToId[value] || null;
      setFormData((prev) => ({
        ...prev,
        role: value,
        roleId: newRoleId, // Se actualiza el roleId basado en el role seleccionado
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Pasa los datos del formulario al método onSave
    onClose(); // Cierra el modal después de guardar
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit} className="modal-form">
        <h2>Edit User</h2>

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

        <div className="form-field">
          <label>
            Status:
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
            />
            {formData.isActive ? " Active" : " Inactive"}
          </label>
        </div>

        <div className="form-group">
          <div className="form-field">
            <label>Role</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="Admin">Admin</option>
              <option value="Delivery">Delivery</option>
              <option value="Dispatcher">Dispatcher</option>
              <option value="Manager">Manager</option>
              <option value="Guest">Guest</option>
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
