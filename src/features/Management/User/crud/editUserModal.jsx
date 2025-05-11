// src/components/EditUserModal.jsx
import React, { useState } from "react";
import "./modal.css";

const EditUserModal = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    verified: user.verified,
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
    onSave(formData);
    onClose();
  };

  return (
    <div className="modal">
      
      <form onSubmit={handleSubmit} className="modal-form">
        <h2>Edit User</h2>
        <label>
          Name:
          <input name="name" value={formData.name} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input name="email" value={formData.email} onChange={handleChange} />
        </label>
        <label>
          Phone:
          <input name="phone" value={formData.phone} onChange={handleChange} />
        </label>
        <label>
          Role:
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="Admin">Admin</option>
            <option value="Dealer">Dealer</option>
            <option value="Support">Support</option>
          </select>
        </label>
        <label className="checkbox-label">
          Verified:
          <input
            name="verified"
            type="checkbox"
            checked={formData.verified}
            onChange={handleChange}
          />
        </label>
        <div className="modal-actions">
          <button type="submit" className="save-btn">Save</button>
          <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditUserModal;
