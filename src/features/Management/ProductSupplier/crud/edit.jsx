import React, { useState, useEffect } from "react";
import "./modal.css";

const EditProductSupplierModal = ({
  productSupplier,
  products,
  suppliers,
  onClose,
  onSave,
  loading,
}) => {
  const [formData, setFormData] = useState({
    productId: productSupplier.productId || "",
    supplierId: productSupplier.supplierId || "",
  });

  useEffect(() => {
    setFormData({
      productId: productSupplier.productId || "",
      supplierId: productSupplier.supplierId || "",
    });
  }, [productSupplier]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.productId || !formData.supplierId) {
      alert("Please select a product and a supplier.");
      return;
    }
    await onSave(formData);
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit} className="modal-form">
        <h2>Edit Product Supplier</h2>

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
          Supplier:
          <select
            name="supplierId"
            value={formData.supplierId}
            onChange={handleChange}
            required
            disabled={loading}
          >
            <option value="">Select a supplier</option>
            {suppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
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

export default EditProductSupplierModal;
