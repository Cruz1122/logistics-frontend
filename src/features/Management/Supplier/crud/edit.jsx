import React, { useState } from "react";
import "./modal.css";

const EditSupplierModal = ({ supplier, onClose, onSave, loading }) => {
  const [formData, setFormData] = useState({
    name: supplier.name,
    phone: supplier.phone,
    email: supplier.email,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave(formData);
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit} className="modal-form">
        <h2>Edit Supplier</h2>

        <label>
          Name:
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={loading}
            autoFocus
          />
        </label>

        <label>
          Phone:
          <input
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </label>

        <label>
          Email:
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </label>

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

export default EditSupplierModal;
