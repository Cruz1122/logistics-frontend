import React from "react";
import "./modal.css";

const DeleteProductWarehouseModal = ({
  productWarehouse,
  onClose,
  onDelete,
  loading,
}) => {
  const handleDelete = async () => {
    await onDelete(productWarehouse);
  };

  return (
    <div className="modal">
      <div className="modal-form">
        <h2>Delete Product-Warehouse</h2>
        <p>
          Are you sure you want to delete the association between product{" "}
          <strong>{productWarehouse.productName || productWarehouse.productId}</strong> and warehouse{" "}
          <strong>{productWarehouse.warehouseName || productWarehouse.warehouseId}</strong>?
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

export default DeleteProductWarehouseModal;
