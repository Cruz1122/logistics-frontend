import React, { useState, useEffect } from "react";
import "./modal.css";

const EditCityModal = ({ city, states, onClose, onSave, loading }) => {
  const [formData, setFormData] = useState({
    name: city.name,
    stateId: city.stateId || "",
  });

  useEffect(() => {
    // Si el city cambia, actualizamos el estado del form
    setFormData({
      name: city.name,
      stateId: city.stateId || "",
    });
  }, [city]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.stateId) {
      alert("Please select a state");
      return;
    }
    await onSave(formData);
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit} className="modal-form">
        <h2>Edit City</h2>

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
          State:
          <select
            name="stateId"
            value={formData.stateId}
            onChange={handleChange}
            required
            disabled={loading}
          >
            <option value="">Select a state</option>
            {states.map((state) => (
              <option key={state.id} value={state.id}>
                {state.name}
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

export default EditCityModal;
