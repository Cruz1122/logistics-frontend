import React, { useState, useEffect } from "react";
import "./order.css";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";

import CreateOrderModal from "./crud/create.jsx";
import EditOrderModal from "./crud/edit.jsx";
import DeleteOrderModal from "./crud/delete.jsx";

import {
  getAllOrders,
  createOrder,
  updateOrder,
  deleteOrder as apiDeleteOrder,
} from "../../../api/order.js";

import { getAllPersonDelivery } from "../../../api/deliveryperson.js";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FullScreenLoader } from "../../../App";

const ORDERS_PER_PAGE = 5;

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [personsDelivery, setPersonsDelivery] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editOrder, setEditOrder] = useState(null);
  const [deleteOrder, setDeleteOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  // Carga inicial combinada: personas de entrega y órdenes
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const [deliveryPersons, ordersRes] = await Promise.all([
          getAllPersonDelivery(),
          getAllOrders(),
        ]);
        setPersonsDelivery(deliveryPersons);

        const mappedOrders = ordersRes.map((order) => {
          const person = deliveryPersons.find((p) => p.id === order.deliveryId);

          // Formatear fecha estimada para visualización
          const formattedEstimatedDelivery = new Date(
            order.estimatedDeliveryTime
          )
            .toISOString()
            .slice(0, 10); // YYYY-MM-DD

          return {
            ...order,
            deliveryPersonName: person ? person.name : "Unknown delivery",
            estimatedDeliveryTime: formattedEstimatedDelivery,
          };
        });

        setOrders(mappedOrders);
      } catch (error) {
        toast.error("Error fetching orders or delivery persons");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  // Refrescar sólo las órdenes usando personas ya cargadas
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const ordersRes = await getAllOrders();
      const mappedOrders = ordersRes.map((order) => {
        const person = personsDelivery.find((p) => p.id === order.deliveryId);
        const formattedEstimatedDelivery = new Date(order.estimatedDeliveryTime)
          .toISOString()
          .slice(0, 10);
        return {
          ...order,
          deliveryPersonName: person ? person.name : "Unknown delivery",
          estimatedDeliveryTime: formattedEstimatedDelivery,
        };
      });
      setOrders(mappedOrders);
    } catch (error) {
      toast.error("Error fetching orders");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data) => {
    try {
      setLoading(true);
      await createOrder(data);
      await fetchOrders();
      setShowCreateModal(false);
      toast.success("Order created");
    } catch (error) {
      toast.error("Error creating order");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (data) => {
    try {
      setLoading(true);
      await updateOrder(editOrder.id, data);
      await fetchOrders();
      setEditOrder(null);
      toast.success("Order updated");
    } catch (error) {
      toast.error("Error updating order");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (order) => {
    try {
      setLoading(true);
      await apiDeleteOrder(order);
      await fetchOrders();
      setDeleteOrder(null);
      setCurrentPage(1);
      toast.success("Order deleted");
    } catch (error) {
      toast.error("Error deleting order");
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter(
    (o) =>
      o.deliveryAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredOrders.length / ORDERS_PER_PAGE);
  const startIndex = (currentPage - 1) * ORDERS_PER_PAGE;
  const paginatedOrders = filteredOrders.slice(
    startIndex,
    startIndex + ORDERS_PER_PAGE
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) {
    return <FullScreenLoader />;
  }

  return (
    <div className="personDelivery-container">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="personDelivery-controls">
        <div className="search-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Search by address or status..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          <button className="search-btn">
            <FaSearch />
          </button>
        </div>
        <button className="create-btn" onClick={() => setShowCreateModal(true)}>
          CREATE +
        </button>
      </div>

      <div className="table-wrapper">
        <table className="personDelivery-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer ID</th>
              <th>Delivery Person</th>
              <th>Status</th>
              <th>Delivery Address</th>
              <th>Creation Date</th>
              <th>Estimated Delivery</th>
              <th>Total Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.length > 0 ? (
              paginatedOrders.map((o) => (
                <tr key={o.id}>
                  <td>{o.id}</td>
                  <td>{o.customerId}</td>
                  <td>{o.deliveryPersonName}</td>
                  <td>{o.status}</td>
                  <td>{o.deliveryAddress}</td>
                  <td>{new Date(o.creationDate).toLocaleDateString()}</td>
                  <td>
                    {new Date(o.estimatedDeliveryTime).toLocaleDateString()}
                  </td>
                  <td>${o.totalAmount.toFixed(2)}</td>
                  <td>
                    <FaEdit
                      onClick={() => setEditOrder(o)}
                      className="edit-btn"
                    />
                    <FaTrash
                      onClick={() => setDeleteOrder(o)}
                      className="delete-btn"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="9"
                  style={{ textAlign: "center", padding: "1rem" }}
                >
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ⬅ Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next ➡
          </button>
        </div>
      )}

      {showCreateModal && (
        <CreateOrderModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreate}
          loading={loading}
          personsDelivery={personsDelivery}
        />
      )}
      {editOrder && (
        <EditOrderModal
          order={editOrder}
          onClose={() => setEditOrder(null)}
          onSave={handleUpdate}
          loading={loading}
          personsDelivery={personsDelivery}
        />
      )}
      {deleteOrder && (
        <DeleteOrderModal
          order={deleteOrder}
          onClose={() => setDeleteOrder(null)}
          onDelete={handleDelete}
          loading={loading}
        />
      )}
    </div>
  );
};

export default Orders;
