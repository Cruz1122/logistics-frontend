import React, { useState } from "react";
import "./modal.css";

const CreateProductModal = ({ onClose, onCreate, loading, categories }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    sku: "",
    barcode: "",
    unitPrice: "",
    weightKg: "",
    dimensions: "",
    isFragile: false,
    needsCooling: false,
    categoryId: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.categoryId) {
      alert("Please select a category.");
      return;
    }
    await onCreate(formData);
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit} className="modal-form">
        <h2>Create New Product</h2>

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
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </label>

        <label>
          SKU:
          <input
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </label>

        <label>
          Barcode:
          <input
            name="barcode"
            value={formData.barcode}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </label>

        <label>
          Unit Price ($):
          <input
            name="unitPrice"
            type="number"
            step="0.01"
            value={formData.unitPrice}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </label>

        <label>
          Weight (kg):
          <input
            name="weightKg"
            type="number"
            step="0.01"
            value={formData.weightKg}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </label>

        <label>
          Dimensions (LxWxH):
          <input
            name="dimensions"
            value={formData.dimensions}
            onChange={handleChange}
            required
            disabled={loading}
            placeholder="e.g. 30x20x15"
          />
        </label>

        {/* Grupo de checkboxes */}
        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              name="isFragile"
              checked={formData.isFragile}
              onChange={handleChange}
              disabled={loading}
            />
            Fragile
          </label>

          <label>
            <input
              type="checkbox"
              name="needsCooling"
              checked={formData.needsCooling}
              onChange={handleChange}
              disabled={loading}
            />
            Needs Cooling
          </label>
        </div>

        <label>
          Category:
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            required
            disabled={loading}
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
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

export default CreateProductModal;
