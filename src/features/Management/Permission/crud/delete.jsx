import React from "react";
import "./modal.css";

const DeleteUserModal = ({ user, onClose, onDelete }) => {
  const handleDelete = () => {
    onDelete(user);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-form">
        <h2>Delete User</h2>
        <p>
          Are you sure you want to delete <strong>{user.name}</strong>?
        </p>
        <div className="modal-actions">
          <button onClick={handleDelete} className="save-btn">
            Yes, Delete
          </button>
          <button onClick={onClose} className="cancel-btn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;
