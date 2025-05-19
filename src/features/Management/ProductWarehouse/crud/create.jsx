import React, { useState } from "react";
import "./modal.css";

const CreateProductWarehouseModal = ({ onClose, onCreate, loading, products, warehouses }) => {
  const [formData, setFormData] = useState({
    productId: "",
    warehouseId: "",
    stockQuantity: "",
    reorderLevel: "",
    lastRestock: "",
    expirationDate: "",
    status: "active",
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

    const requiredFields = ["productId", "warehouseId", "stockQuantity", "reorderLevel", "status"];
    const missing = requiredFields.find((field) => !formData[field]);

    if (missing) {
      alert("Please fill in all required fields.");
      return;
    }

    await onCreate(formData);
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit} className="modal-form">
        <h2>Create Product-Warehouse Relation</h2>

        <label>
          Product:
          <select
            name="productId"
            value={formData.productId}
            onChange={handleChange}
            required
            disabled={loading}
            autoFocus
          >
            <option value="">Select a product</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Warehouse:
          <select
            name="warehouseId"
            value={formData.warehouseId}
            onChange={handleChange}
            required
            disabled={loading}
          >
            <option value="">Select a warehouse</option>
            {warehouses.map((warehouse) => (
              <option key={warehouse.id} value={warehouse.id}>
                {warehouse.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Stock Quantity:
          <input
            type="number"
            name="stockQuantity"
            value={formData.stockQuantity}
            onChange={(e) =>
              handleChange({
                target: {
                  name: "stockQuantity",
                  value: e.target.value === "" ? "" : parseInt(e.target.value, 10),
                },
              })
            }
            required
            min="0"
            disabled={loading}
          />
        </label>

        <label>
          Reorder Level:
          <input
            type="number"
            name="reorderLevel"
            value={formData.reorderLevel}
            onChange={(e) =>
              handleChange({
                target: {
                  name: "reorderLevel",
                  value: e.target.value === "" ? "" : parseInt(e.target.value, 10),
                },
              })
            }
            required
            min="0"
            disabled={loading}
          />
        </label>

        <label>
          Last Restock:
          <input
            type="date"
            name="lastRestock"
            value={formData.lastRestock}
            onChange={handleChange}
            disabled={loading}
          />
        </label>

        <label>
          Expiration Date:
          <input
            type="date"
            name="expirationDate"
            value={formData.expirationDate}
            onChange={handleChange}
            disabled={loading}
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

export default CreateProductWarehouseModal;
