import React, { useState, useEffect } from "react";
import "./productwarehousemovement.css";
import { FaSearch } from "react-icons/fa";

import {
  getAllProductWarehouseMovements,
} from "../../../api/productwarehousemovement";

import { getAllProductWarehouses } from "../../../api/productwarehouse";
import { getAllUsers } from "../../../api/user";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ITEMS_PER_PAGE = 5;

const ProductWarehouseMovement = () => {
  const [movements, setMovements] = useState([]);
  const [productWarehouses, setProductWarehouses] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchInitialData = async () => {
    try {
      const [pw, usrs] = await Promise.all([
        getAllProductWarehouses(),
        getAllUsers(),
      ]);
      setProductWarehouses(pw);
      setUsers(usrs);
    } catch (error) {
      toast.error("Error fetching initial data");
    }
  };

  const fetchMovements = async () => {
    try {
      const rawMovements = await getAllProductWarehouseMovements();

      const mappedMovements = rawMovements.map((mov) => {
        const pw = productWarehouses.find((p) => p.id === mov.productWarehouseId);
        const productName = pw?.product?.name || "Unknown Product";
        const warehouseName = pw?.warehouse?.name || "Unknown Warehouse";
        const user = users.find((u) => u.id === mov.performedById);
        const performedByName = user?.fullName || user?.name || "Unknown User";

        return {
          ...mov,
          productName,
          warehouseName,
          performedByName,
        };
      });

      setMovements(mappedMovements);
    } catch (error) {
      toast.error("Error fetching movements");
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (productWarehouses.length > 0 && users.length > 0) {
      fetchMovements();
    }
  }, [productWarehouses, users]);

  const filteredMovements = movements.filter((mov) =>
    [mov.productName, mov.warehouseName, mov.movementType, mov.performedByName, mov.notes]
      .some((field) => field?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredMovements.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedMovements = filteredMovements.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="product-warehouse-movement-container">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="controls">
        <div className="search-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          <button className="search-btn" disabled>
            <FaSearch />
          </button>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="movement-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Warehouse</th>
              <th>Movement Type</th>
              <th>Quantity Moved</th>
              <th>Stock After</th>
              <th>Timestamp</th>
              <th>Performed By</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {paginatedMovements.map((mov) => (
              <tr key={mov.id}>
                <td>{mov.productName}</td>
                <td>{mov.warehouseName}</td>
                <td>{mov.movementType}</td>
                <td>{mov.quantityMoved}</td>
                <td>{mov.stockAfter}</td>
                <td>{new Date(mov.timestamp).toLocaleString()}</td>
                <td>{mov.performedByName}</td>
                <td>{mov.notes}</td>
              </tr>
            ))}
            {paginatedMovements.length === 0 && (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", padding: "1rem" }}>
                  No product warehouse movements found.
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
    </div>
  );
};

export default ProductWarehouseMovement;
