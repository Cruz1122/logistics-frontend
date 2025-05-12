import React from "react";
import "./modal.css";

const DeleteRolPermissionModal = ({ rolPermission, onClose, onDelete }) => {
  const handleDelete = () => {
    onDelete(rolPermission);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-form">
        <h2>Delete Role-Permission Relationship</h2>
        <p>
          Are you sure you want to delete the relationship between{" "}
          <strong>{rolPermission.roleName}</strong> and{" "}
          <strong>{rolPermission.permissionName}</strong>?
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

export default DeleteRolPermissionModal;
