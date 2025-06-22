import React from "react";
import "./modal.css";

const DeleteProductSupplierModal = ({ productSupplier, onClose, onDelete, loading }) => {
  const handleDelete = async () => {
    await onDelete(productSupplier);
  };

  return (
    <div className="modal">
      <div className="modal-form">
        <h2>Delete Product Supplier</h2>
        <p>
          Are you sure you want to delete the association between product <strong>{productSupplier.productName || productSupplier.productId}</strong> and supplier <strong>{productSupplier.supplierName || productSupplier.supplierId}</strong>?
        </p>
        <div className="modal-actions">
          <button
            onClick={handleDelete}
            className="save-btn"
            disabled={loading}
          >
            {loading ? "Deleting..." : "Yes, Delete"}
          </button>
          <button
            onClick={onClose}
            className="cancel-btn"
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProductSupplierModal;
