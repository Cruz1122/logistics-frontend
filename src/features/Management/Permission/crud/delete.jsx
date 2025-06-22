import React from "react";
import "./modal.css";

const DeletePermissionModal = ({ permission, onClose, onDelete, loading }) => {
  const handleDelete = async () => {
    await onDelete(permission);
  };

  return (
    <div className="modal">
      <div className="modal-form">
        <h2>Delete Permission</h2>
        <p>
          Are you sure you want to delete <strong>{permission.name}</strong>?
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

export default DeletePermissionModal;
