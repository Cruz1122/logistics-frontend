import React, { useState } from "react";
import "./modal.css";

const CreatePersonDeliveryModal = ({ onClose, onCreate, loading, users }) => {
  const [formData, setFormData] = useState({
    name: "",
    latitude: "",
    longitude: "",
    idUser: "", // usuario asignado
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
    if (!formData.idUser) {
      alert("Please select a user.");
      return;
    }
    await onCreate(formData);
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit} className="modal-form">
        <h2>Create New Delivery Person</h2>

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
          Latitude:
          <input
            name="latitude"
            type="number"
            step="0.000001"
            value={formData.latitude}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </label>

        <label>
          Longitude:
          <input
            name="longitude"
            type="number"
            step="0.000001"
            value={formData.longitude}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </label>

        <label>
          User:
          <select
            name="idUser"
            value={formData.idUser}
            onChange={handleChange}
            required
            disabled={loading}
          >
            <option value="">Select a user</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} {user.lastName}
              </option>
            ))}
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

export default CreatePersonDeliveryModal;
