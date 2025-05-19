import React, { useState, useEffect } from "react";
import "./productwarehouse.css"; // adapta el CSS si quieres
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";

import CreateProductWarehouseModal from "./crud/create";
import EditProductWarehouseModal from "./crud/edit";
import DeleteProductWarehouseModal from "./crud/delete";

import {
  getAllProductWarehouses,
  createProductWarehouse,
  updateProductWarehouse,
  deleteProductWarehouse as apiDeleteProductWarehouse,
} from "../../../api/productwarehouse";

import { getAllProducts } from "../../../api/product";
import { getAllWarehouses } from "../../../api/warehouse";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ITEMS_PER_PAGE = 5;

const ProductWarehouse = () => {
  const [relations, setRelations] = useState([]);
  const [products, setProducts] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editRelation, setEditRelation] = useState(null);
  const [deleteRelation, setDeleteRelation] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await getAllProducts();
      const sorted = res.sort((a, b) => a.name.localeCompare(b.name));
      setProducts(sorted);
    } catch (error) {
      toast.error("Error fetching products");
    }
  };

  const fetchWarehouses = async () => {
    try {
      const res = await getAllWarehouses();
      const sorted = res.sort((a, b) => a.name.localeCompare(b.name));
      setWarehouses(sorted);
    } catch (error) {
      toast.error("Error fetching warehouses");
    }
  };

  const fetchRelations = async () => {
    try {
      const rawRelations = await getAllProductWarehouses();
      const mappedRelations = rawRelations.map((rel) => {
        const product = products.find((p) => p.id === rel.productId);
        const warehouse = warehouses.find((w) => w.id === rel.warehouseId);

        return {
          ...rel,
          productName: product ? product.name : "Unknown",
          warehouseName: warehouse ? warehouse.name : "Unknown",
        };
      });
      setRelations(mappedRelations);
    } catch (error) {
      toast.error("Error fetching product-warehouse relations");
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchWarehouses();
  }, []);

  useEffect(() => {
    if (products.length > 0 && warehouses.length > 0) {
      fetchRelations();
    }
  }, [products, warehouses]);

  const handleCreate = async (newData) => {
    try {
      setLoading(true);
      await createProductWarehouse(newData);
      await fetchRelations();
      setShowCreateModal(false);
      toast.success("Relation created");
    } catch (error) {
      toast.error("Error creating relation");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (updatedData) => {
    try {
      setLoading(true);
      await updateProductWarehouse(editRelation.id, updatedData);
      await fetchRelations();
      setEditRelation(null);
      toast.success("Relation updated");
    } catch (error) {
      toast.error("Error updating relation");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (relationToDelete) => {
    try {
      setLoading(true);
      await apiDeleteProductWarehouse(relationToDelete.id);
      await fetchRelations();
      setDeleteRelation(null);
      setCurrentPage(1);
      toast.success("Relation deleted");
    } catch (error) {
      toast.error("Error deleting relation");
    } finally {
      setLoading(false);
    }
  };

  const filteredRelations = relations.filter(
    (rel) =>
      rel.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rel.warehouseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredRelations.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedRelations = filteredRelations.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="product-warehouse-container">
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
          <button className="search-btn">
            <FaSearch />
          </button>
        </div>
        <button
          className="create-btn"
          onClick={() => setShowCreateModal(true)}
        >
          CREATE +
        </button>
      </div>

      <div className="table-wrapper">
        <table className="relation-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Warehouse</th>
              <th>Stock</th>
              <th>Reorder Level</th>
              <th>Last Restock</th>
              <th>Expiration</th>
              <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedRelations.map((rel) => (
            <tr key={rel.id}>
              <td>{rel.productName}</td>
              <td>{rel.warehouseName}</td>
              <td>{rel.stockQuantity}</td>
              <td>{rel.reorderLevel}</td>
              <td>{rel.lastRestock}</td>
              <td>{rel.expirationDate}</td>
              <td>{rel.status}</td>
              <td>
                <FaEdit
                  onClick={() => setEditRelation(rel)}
                  className="edit-btn"
                />
                <FaTrash
                  onClick={() => setDeleteRelation(rel)}
                  className="delete-btn"
                />
              </td>
            </tr>
          ))}
          {paginatedRelations.length === 0 && (
            <tr>
              <td colSpan="8" style={{ textAlign: "center", padding: "1rem" }}>
                No product-warehouse data found.
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
        <CreateProductWarehouseModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreate}
          loading={loading}
          products={products}
          warehouses={warehouses}
        />
      )}
      {editRelation && (
        <EditProductWarehouseModal
          productWarehouse={editRelation}
          onClose={() => setEditRelation(null)}
          onSave={handleUpdate}
          loading={loading}
          products={products}
          warehouses={warehouses}
        />
      )}
      {deleteRelation && (
        <DeleteProductWarehouseModal
          productWarehouse={deleteRelation}
          onClose={() => setDeleteRelation(null)}
          onDelete={handleDelete}
          loading={loading}
        />
      )}
    </div>
  );
};

export default ProductWarehouse;
