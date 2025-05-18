import React from "react";
import "./modal.css";

const DeleteCategoryModal = ({ category, onClose, onDelete, loading }) => {
  const handleDelete = async () => {
    await onDelete(category);
  };

  return (
    <div className="modal">
      <div className="modal-form">
        <h2>Delete Category</h2>
        <p>
          Are you sure you want to delete <strong>{category.name}</strong>?
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

export default DeleteCategoryModal;
