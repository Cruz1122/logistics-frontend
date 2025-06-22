import React from "react";
import "./modal.css";

const DeleteOrderModal = ({ order, onClose, onDelete, loading }) => {
  const handleDelete = async () => {
    await onDelete(order.id);
  };

  return (
    <div className="modal">
      <div className="modal-form">
        <h2>Delete Order</h2>
        <p>
          Are you sure you want to delete the order with ID <strong>{order.id}</strong>?
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

export default DeleteOrderModal;
