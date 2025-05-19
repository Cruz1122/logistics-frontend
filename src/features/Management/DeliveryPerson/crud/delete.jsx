import React from "react";
import "./modal.css";

const DeletePersonDeliveryModal = ({ person, onClose, onDelete, loading }) => {
  const handleDelete = async () => {
    await onDelete(person.id);
  };

  return (
    <div className="modal">
      <div className="modal-form">
        <h2>Delete Delivery Person</h2>
        <p>
          Are you sure you want to delete <strong>{person.name} {person.lastName}</strong>?
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

export default DeletePersonDeliveryModal;
