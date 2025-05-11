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
          Are you sure you want to delete <strong>{user.name} {user.lastName}</strong>? 
          <br />This action is <strong>irreversible</strong>.
        </p>
        <div className="modal-actions">
          <button onClick={onClose} className="cancel-btn">
            Cancel
          </button>
          <button onClick={handleDelete} className="save-btn">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;
