import React, { useState, useEffect } from "react";
import "./supplier.css";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";

import CreateSupplierModal from "./crud/create";
import EditSupplierModal from "./crud/edit";
import DeleteSupplierModal from "./crud/delete";
import {
  getAllSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier as apiDeleteSupplier,
} from "../../../api/supplier";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FullScreenLoader } from "../../../App";

const SUPPLIERS_PER_PAGE = 5;

const Supplier = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editSupplier, setEditSupplier] = useState(null);
  const [deleteSupplier, setDeleteSupplier] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      const rawSuppliers = await getAllSuppliers();

      const mappedSuppliers = rawSuppliers.map((supplier) => ({
        id: supplier.id,
        name: supplier.name,
        phone: supplier.phone,
        email: supplier.email,
      }));

      setSuppliers(mappedSuppliers);
    } catch (error) {
      toast.error("Error fetching suppliers");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleCreate = async (newSupplierData) => {
    try {
      setLoading(true);
      await createSupplier(newSupplierData);
      await fetchSuppliers();
      setShowCreateModal(false);
      toast.success("Supplier created successfully");
    } catch (error) {
      toast.error("Error creating supplier");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (updatedSupplierData) => {
    try {
      setLoading(true);
      await updateSupplier(editSupplier.id, updatedSupplierData);
      await fetchSuppliers();
      setEditSupplier(null);
      toast.success("Supplier updated successfully");
    } catch (error) {
      toast.error("Error updating supplier");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (supplierToDelete) => {
    try {
      setLoading(true);
      await apiDeleteSupplier(supplierToDelete);
      await fetchSuppliers();
      setDeleteSupplier(null);
      setCurrentPage(1);
      toast.success("Supplier deleted successfully");
    } catch (error) {
      toast.error("Error deleting supplier");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredSuppliers.length / SUPPLIERS_PER_PAGE);
  const startIndex = (currentPage - 1) * SUPPLIERS_PER_PAGE;
  const paginatedSuppliers = filteredSuppliers.slice(
    startIndex,
    startIndex + SUPPLIERS_PER_PAGE
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
    <div className="supplier-container">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="supplier-controls">
        <div className="search-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Search suppliers..."
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
        <table className="supplier-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedSuppliers.length > 0 ? (
              paginatedSuppliers.map((supplier) => (
                <tr key={supplier.id} className="supplier-row">
                  <td>{supplier.name}</td>
                  <td>{supplier.phone}</td>
                  <td>{supplier.email}</td>
                  <td>
                    <FaEdit
                      className="edit-btn"
                      onClick={() => setEditSupplier(supplier)}
                    />
                    <FaTrash
                      className="delete-btn"
                      onClick={() => setDeleteSupplier(supplier)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  style={{ textAlign: "center", padding: "1rem" }}
                >
                  No suppliers found.
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
        <CreateSupplierModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreate}
          loading={loading}
        />
      )}
      {editSupplier && (
        <EditSupplierModal
          supplier={editSupplier}
          onClose={() => setEditSupplier(null)}
          onSave={handleUpdate}
          loading={loading}
        />
      )}
      {deleteSupplier && (
        <DeleteSupplierModal
          supplier={deleteSupplier}
          onClose={() => setDeleteSupplier(null)}
          onDelete={handleDelete}
          loading={loading}
        />
      )}
    </div>
  );
};

export default Supplier;
