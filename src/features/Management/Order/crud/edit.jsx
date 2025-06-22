import React, { useState, useEffect } from "react";
import "./modal.css";

const EditOrderModal = ({ order, personsDelivery, onClose, onSave, loading }) => {
  const [formData, setFormData] = useState({
    customerId: "",
    deliveryId: "",
    status: "pending",
    deliveryAddress: "",
    creationDate: "",
    estimatedDeliveryTime: "",
    totalAmount: "",
  });

  useEffect(() => {
    if (order) {
      const estimated = new Date(order.estimatedDeliveryTime)
        .toISOString()
        .slice(0, 10); // formato YYYY-MM-DD

      const creation = new Date(order.creationDate)
        .toISOString()
        .slice(0, 10); // formato YYYY-MM-DD

      setFormData({
        customerId: order.customerId || "",
        deliveryId: order.deliveryId || "",
        status: order.status || "pending",
        deliveryAddress: order.deliveryAddress || "",
        creationDate: creation,
        estimatedDeliveryTime: estimated,
        totalAmount: order.totalAmount !== undefined ? order.totalAmount : "",
      });
    }
  }, [order]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.deliveryId) {
      alert("Please select a delivery person.");
      return;
    }
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

    await onSave(formData);
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit} className="modal-form">
        <h2>Edit Order</h2>

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
          Delivery Person:
          <select
            name="deliveryId"
            value={formData.deliveryId}
            onChange={handleChange}
            required
            disabled={loading}
          >
            <option value="">Select a delivery person</option>
            {personsDelivery.map((person) => (
              <option key={person.id} value={person.id}>
                {person.name}
              </option>
            ))}
          </select>
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
            type="date"
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
            {loading ? "Saving..." : "Save"}
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

export default EditOrderModal;
