import React, { useState, useEffect } from "react";
import "./productSupplier.css";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";

import CreateProductSupplierModal from "./crud/create";
import EditProductSupplierModal from "./crud/edit";
import DeleteProductSupplierModal from "./crud/delete";

import {
  getAllProductSuppliers,
  createProductSupplier,
  updateProductSupplier,
  deleteProductSupplier as apiDeleteProductSupplier,
} from "../../../api/productsupplier";

import { getAllProducts } from "../../../api/product";
import { getAllSuppliers } from "../../../api/supplier";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FullScreenLoader } from "../../../App";

const ITEMS_PER_PAGE = 5;

const ProductSupplier = () => {
  const [relations, setRelations] = useState([]);
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editRelation, setEditRelation] = useState(null);
  const [deleteRelation, setDeleteRelation] = useState(null);
  const [loading, setLoading] = useState(false);

  // Carga inicial combinada de productos y proveedores
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);

        const [productsRes, suppliersRes] = await Promise.all([
          getAllProducts(),
          getAllSuppliers(),
        ]);

        const sortedProducts = productsRes.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        const sortedSuppliers = suppliersRes.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        setProducts(sortedProducts);
        setSuppliers(sortedSuppliers);

        // Cargar relaciones y mapear con nombres actualizados
        const rawRelations = await getAllProductSuppliers();

        const mappedRelations = rawRelations.map((rel) => {
          const product = sortedProducts.find((p) => p.id === rel.productId);
          const supplier = sortedSuppliers.find((s) => s.id === rel.supplierId);

          return {
            ...rel,
            productName: product ? product.name : "Unknown",
            supplierName: supplier ? supplier.name : "Unknown",
          };
        });

        setRelations(mappedRelations);
      } catch (error) {
        toast.error("Error loading initial data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Refrescar solo relaciones usando productos y proveedores ya cargados
  const fetchRelations = async () => {
    try {
      setLoading(true);
      const rawRelations = await getAllProductSuppliers();
      const mappedRelations = rawRelations.map((rel) => {
        const product = products.find((p) => p.id === rel.productId);
        const supplier = suppliers.find((s) => s.id === rel.supplierId);

        return {
          ...rel,
          productName: product ? product.name : "Unknown",
          supplierName: supplier ? supplier.name : "Unknown",
        };
      });
      setRelations(mappedRelations);
    } catch (error) {
      toast.error("Error fetching product-supplier relations");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (newRelationData) => {
    try {
      setLoading(true);
      await createProductSupplier(newRelationData);
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
      await updateProductSupplier(editRelation.id, updatedData);
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
      await apiDeleteProductSupplier(relationToDelete.id);
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
      rel.supplierName.toLowerCase().includes(searchTerm.toLowerCase())
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

  if (loading) {
    return <FullScreenLoader />;
  }

  return (
    <div className="product-supplier-container">
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
        <button className="create-btn" onClick={() => setShowCreateModal(true)}>
          CREATE +
        </button>
      </div>

      <div className="table-wrapper">
        <table className="relation-table">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product</th>
              <th>Supplier ID</th>
              <th>Supplier</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedRelations.length > 0 ? (
              paginatedRelations.map((rel) => (
                <tr key={`${rel.productId}-${rel.supplierId}`}>
                  <td>{rel.productId}</td>
                  <td>{rel.productName}</td>
                  <td>{rel.supplierId}</td>
                  <td>{rel.supplierName}</td>
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
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  style={{ textAlign: "center", padding: "1rem" }}
                >
                  No relations found.
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
        <CreateProductSupplierModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreate}
          loading={loading}
          products={products}
          suppliers={suppliers}
        />
      )}
      {editRelation && (
        <EditProductSupplierModal
          productSupplier={editRelation}
          onClose={() => setEditRelation(null)}
          onSave={handleUpdate}
          loading={loading}
          products={products}
          suppliers={suppliers}
        />
      )}
      {deleteRelation && (
        <DeleteProductSupplierModal
          productSupplier={deleteRelation}
          onClose={() => setDeleteRelation(null)}
          onDelete={handleDelete}
          loading={loading}
        />
      )}
    </div>
  );
};

export default ProductSupplier;
