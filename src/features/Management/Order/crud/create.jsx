import React, { useState } from "react";
import "./modal.css";

const CreateOrderModal = ({ onClose, onCreate, loading }) => {
  const [formData, setFormData] = useState({
    customerId: "",       // ID del cliente
    status: "pending",    // Estado inicial
    deliveryAddress: "",
    creationDate: new Date().toISOString().slice(0, 10),
    estimatedDeliveryTime: "",
    totalAmount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.deliveryAddress) {
      alert("Please enter a delivery address.");
      return;
    }

    if (!formData.estimatedDeliveryTime) {
      alert("Please enter an estimated delivery time.");
      return;
    }

    if (!formData.totalAmount || isNaN(formData.totalAmount)) {
      alert("Please enter a valid total amount.");
      return;
    }

    const dataToSend = {
      ...formData,
      totalAmount: parseFloat(formData.totalAmount),
    };

    await onCreate(dataToSend);
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit} className="modal-form">
        <h2>Create New Order</h2>

        <label>
          Customer ID:
          <input
            name="customerId"
            value={formData.customerId}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </label>

        <label>
          Status:
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            disabled={loading}
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </label>

        <label>
          Delivery Address:
          <input
            name="deliveryAddress"
            value={formData.deliveryAddress}
            onChange={handleChange}
            required
            disabled={loading}
            autoFocus
          />
        </label>

        <label>
          Creation Date:
          <input
            name="creationDate"
            type="date"
            value={formData.creationDate}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </label>

        <label>
          Estimated Delivery Time:
          <input
            name="estimatedDeliveryTime"
            type="datetime-local"
            value={formData.estimatedDeliveryTime}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </label>

        <label>
          Total Amount:
          <input
            name="totalAmount"
            type="number"
            step="0.01"
            value={formData.totalAmount}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </label>

        <div className="modal-actions">
          <button type="submit" className="save-btn" disabled={loading}>
            {loading ? "Creating..." : "Create"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="cancel-btn"
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateOrderModal;
