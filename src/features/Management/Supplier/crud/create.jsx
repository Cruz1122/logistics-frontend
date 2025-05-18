import React, { useState } from "react";
import "./modal.css";

const CreateSupplierModal = ({ onClose, onCreate, loading }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
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
    await onCreate(formData);
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit} className="modal-form">
        <h2>Create New Supplier</h2>

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
            {loading ? "Creating..." : "Create"}
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

export default CreateSupplierModal;
