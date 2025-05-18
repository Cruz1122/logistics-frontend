import React, { useState } from "react";
import "./modal.css";

const CreateWarehouseModal = ({ onClose, onCreate, loading, cities }) => {
  const [formData, setFormData] = useState({
    name: "",
    cityId: "",
    managerId: "",
    address: "",
    postalCode: "",
    capacityM2: "",
    status: "active",
    latitude: "",
    longitude: "",
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
    if (!formData.cityId || !formData.managerId) {
      alert("Please select a city and assign a manager.");
      return;
    }
    await onCreate(formData);
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit} className="modal-form">
        <h2>Create New Warehouse</h2>

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
          City:
          <select
            name="cityId"
            value={formData.cityId}
            onChange={handleChange}
            required
            disabled={loading}
          >
            <option value="">Select a city</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Manager ID:
          <input
            name="managerId"
            value={formData.managerId}
            onChange={handleChange}
            required
            disabled={loading}
            placeholder="e.g. 123456"
          />
        </label>

        <label>
          Address:
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </label>

        <label>
          Postal Code:
          <input
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </label>

        <label>
          capacity m<sup>2</sup>:
          <input
            name="capacityM2"
            type="number"
            value={formData.capacityM2}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </label>

        <label>
          Latitude:
          <input
            name="latitude"
            type="number"
            step="any"
            value={formData.latitude}
            onChange={handleChange}
            required
            disabled={loading}
            placeholder="e.g. 4.7110"
          />
        </label>

        <label>
          Longitude:
          <input
            name="longitude"
            type="number"
            step="any"
            value={formData.longitude}
            onChange={handleChange}
            required
            disabled={loading}
            placeholder="e.g. -74.0721"
          />
        </label>

        <label>
          Status:
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            disabled={loading}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
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

export default CreateWarehouseModal;
