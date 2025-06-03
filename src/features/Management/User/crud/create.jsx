import React, { useState, useEffect } from "react";
import "./modal.css";
import { toast } from "react-toastify";
import { getAllCities } from "../../../../api/city";

const CreateUserModal = ({ onClose, onCreate, isOpen }) => {
  const [cities, setCities] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    lastName: "",
    phone: "",
    role: "",
    cityId: "",
  });

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        email: "",
        password: "",
        name: "",
        lastName: "",
        phone: "",
        role: "",
        cityId: "",
      });
    }
  }, [isOpen]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const data = await getAllCities();
        setCities(data.sort((a, b) => a.name.localeCompare(b.name)));
      } catch (err) {
        toast.error("Error loading cities");
      }
    };

    fetchCities();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    if (!passwordRegex.test(formData.password)) {
      toast.error(
        "Password must be at least 6 characters, include uppercase, lowercase, number and special character"
      );
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
              <option value="" disabled hidden>
                Select Role
              </option>
              <option value="Admin">Admin</option>
              <option value="Delivery">Delivery</option>
              <option value="Dispatcher">Dispatcher</option>
              <option value="Manager">Manager</option>
              <option value="Guest">Guest</option>
            </select>
          </label>
        </div>

        <div className="form-field">
          <label>
            Select City:
            <select
              name="cityId"
              value={formData.cityId}
              onChange={handleChange}
              required
            >
              <option value="" disabled hidden>
                Select City
              </option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="modal-actions">
          <button type="button" onClick={onClose} className="cancel-btn">
            Cancel
          </button>
          <button type="submit" className="save-btn">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUserModal;
