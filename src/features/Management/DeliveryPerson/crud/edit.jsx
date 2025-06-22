import React, { useState, useEffect } from "react";
import "./modal.css";

const EditPersonDeliveryModal = ({
  person,
  users,
  onClose,
  onSave,
  loading,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    latitude: "",
    longitude: "",
    idUser: "",
  });

  useEffect(() => {
    if (person) {
      setFormData({
        name: person.name || "",
        latitude: person.latitude || "",
        longitude: person.longitude || "",
        idUser: person.idUser || "",
      });
    }
  }, [person]);

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
    const dataToSend = { ...formData };

    // Si lat o long están vacíos, los borramos del objeto
    if (dataToSend.latitude === "") delete dataToSend.latitude;
    if (dataToSend.longitude === "") delete dataToSend.longitude;

    await onSave(dataToSend);
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit} className="modal-form">
        <h2>Edit Delivery Person</h2>

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
                {user.name} {user.lastname}
              </option>
            ))}
          </select>
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

export default EditPersonDeliveryModal;
