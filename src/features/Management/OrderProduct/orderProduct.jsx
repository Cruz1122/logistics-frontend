import React, { useState, useEffect } from "react";
import "./orderProduct.css";
import { FaSearch } from "react-icons/fa";

import {
  getAllOrderProducts,
} from "../../../api/orderproduct.js";

import { getAllProductWarehouses } from "../../../api/productwarehouse.js";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FullScreenLoader } from "../../../App.jsx";

const ORDERPRODUCTS_PER_PAGE = 5;

const OrderProduct = () => {
  const [orderProducts, setOrderProducts] = useState([]);
  const [productWarehouses, setProductWarehouses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [orderProductsData, productWarehousesData] = await Promise.all([
        getAllOrderProducts(),
        getAllProductWarehouses(),
      ]);
      setOrderProducts(orderProductsData);
      setProductWarehouses(productWarehousesData);
    } catch (error) {
      toast.error("Error al obtener los datos");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrderProducts = orderProducts.filter((op) =>
    op.orderId.toString().includes(searchTerm) ||
    op.productId.toString().includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredOrderProducts.length / ORDERPRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * ORDERPRODUCTS_PER_PAGE;
  const paginatedOrderProducts = filteredOrderProducts.slice(
    startIndex,
    startIndex + ORDERPRODUCTS_PER_PAGE
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Ahora esta función devuelve el objeto con nombre de producto y nombre de almacén
  const getProductWarehouseInfo = (productId) => {
    const pw = productWarehouses.find((pw) => pw.productId === productId);
    if (pw && pw.product && pw.warehouse) {
      return { productName: pw.product.name, warehouseName: pw.warehouse.name };
    }
    return { productName: "N/A", warehouseName: "N/A" };
  };

  if (loading) return <FullScreenLoader />;

  return (
    <div className="orderProduct-container">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="orderProduct-controls">
        <div className="search-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Buscar por OrderId o ProductId..."
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
        {/* Botón de crear eliminado */}
      </div>

      <div className="table-wrapper">
        <table className="orderProduct-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Order ID</th>
              <th>Product ID</th>
              <th>Product Name</th>  {/* Nueva columna */}
              <th>Warehouse Name</th> {/* Nueva columna */}
              <th>Quantity</th>
              <th>Unit Price</th>
              {/* Eliminadas columnas de acciones */}
            </tr>
          </thead>
          <tbody>
            {paginatedOrderProducts.length > 0 ? (
              paginatedOrderProducts.map((op) => {
                const { productName, warehouseName } = getProductWarehouseInfo(op.productId);
                return (
                  <tr key={op.id}>
                    <td>{op.id}</td>
                    <td>{op.orderId}</td>
                    <td>{op.productId}</td>
                    <td>{productName}</td>
                    <td>{warehouseName}</td>
                    <td>{op.quantity}</td>
                    <td>${parseFloat(op.unitPrice).toFixed(2)}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "1rem" }}>
                  No se encontraron registros.
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
            Página {currentPage} de {totalPages}
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

export default OrderProduct;
