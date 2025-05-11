import React, { useState, useEffect } from "react";
import "./modal.css";

const CreateUserModal = ({ onClose, onCreate, isOpen }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    lastName: "",
    phone: "",
    role: "", // Cambié a "role" en vez de "roleId"
  });

  // Resetear los valores cuando el modal se cierre o cuando `isOpen` cambie
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        email: "",
        password: "",
        name: "",
        lastName: "",
        phone: "",
        role: "",
      });
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación para password
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    if (!passwordRegex.test(formData.password)) {
      alert("Password must be at least 6 characters, include uppercase, lowercase, number and special character");
      return;
    }

    onCreate(formData);
    onClose();
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit} className="modal-form">
        <h2>Create New User</h2>

        <div className="form-field">
          <label>
            Name:
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="form-field">
          <label>
            Last Name:
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="form-field">
          <label>
            Email:
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="form-field">
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="form-field">
          <label>
            Phone:
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="form-field">
          <label>
            Select Role:
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="" disabled hidden>Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Delivery">Delivery</option>
              <option value="Dispatcher">Dispatcher</option>
              <option value="Manager">Manager</option>
              <option value="Guest">Guest</option>
            </select>
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

export default CreateUserModal;
