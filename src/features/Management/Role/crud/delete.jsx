import React from "react";
import "./modal.css";

const DeleteRoleModal = ({ role, onClose, onDelete, loading }) => {
  const handleDelete = () => {
    onDelete(role);
  };

  return (
    <div className="modal">
      <div className="modal-form">
        <h2>Delete Role</h2>
        <p>
          Are you sure you want to delete <strong>{role.name}</strong>?
        </p>
        <div className="modal-actions">
          <button onClick={handleDelete} className="save-btn" disabled={loading}>
            {loading ? "Deleting..." : "Yes, Delete"}
          </button>
          <button onClick={onClose} className="cancel-btn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteRoleModal;
