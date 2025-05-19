import React, { useState, useEffect } from "react";
import "./product.css"; // Asegúrate de crear o adaptar este archivo
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";

import CreateProductModal from "./crud/create";
import EditProductModal from "./crud/edit";
import DeleteProductModal from "./crud/delete";

import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct as apiDeleteProduct,
} from "../../../api/product";

import { getAllCategories } from "../../../api/category";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdCheckCircle, MdCancel } from "react-icons/md";


const PRODUCTS_PER_PAGE = 5;

const Product = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      const res = await getAllCategories();
      const sorted = res.sort((a, b) => a.name.localeCompare(b.name));
      setCategories(sorted);
    } catch (error) {
      toast.error("Error fetching categories");
    }
  };

  const fetchProducts = async () => {
    try {
      const rawProducts = await getAllProducts();
      const mapped = rawProducts.map((product) => {
        const category = categories.find((c) => c.id === product.categoryId);
        return {
          ...product,
          categoryName: category ? category.name : "Unknown",
        };
      });
      setProducts(mapped);
    } catch (error) {
      toast.error("Error fetching products");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      fetchProducts();
    }
  }, [categories]);

  const handleCreate = async (data) => {
    try {
      setLoading(true);
      await createProduct(data);
      await fetchProducts();
      setShowCreateModal(false);
      toast.success("Product created");
    } catch (error) {
      toast.error("Error creating product");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (data) => {
    try {
      setLoading(true);
      await updateProduct(editProduct.id, data);
      await fetchProducts();
      setEditProduct(null);
      toast.success("Product updated");
    } catch (error) {
      toast.error("Error updating product");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (product) => {
    try {
      setLoading(true);
      await apiDeleteProduct(product);
      await fetchProducts();
      setDeleteProduct(null);
      setCurrentPage(1);
      toast.success("Product deleted");
    } catch (error) {
      toast.error("Error deleting product");
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="product-container">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="product-controls">
        <div className="search-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Search products..."
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
      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Description</th>
            <th>SKU</th>
            <th>Barcode</th>
            <th>Price</th>
            <th>Weight (kg)</th>
            <th>Dimensions</th>
            <th>Fragile</th>
            <th>Cooling</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedProducts.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.categoryName}</td>
              <td>{p.description}</td>
              <td>{p.sku}</td>
              <td>{p.barcode}</td>
              <td>{p.unitPrice}</td>
              <td>{p.weightKg}</td>
              <td>{p.dimensions}</td>
              <td>
                {p.isFragile ? (
                  <MdCheckCircle size={20} color="#5edd60" />
                ) : (
                  <MdCancel size={20} color="red" />
                )}
              </td>
              <td>
                {p.needsCooling ? (
                  <MdCheckCircle size={20} color="#5edd60" />
                ) : (
                  <MdCancel size={20} color="red" />
                )}
              </td>

              <td>
                <FaEdit
                  onClick={() => setEditProduct(p)}
                  className="edit-btn"
                />
                <FaTrash
                  onClick={() => setDeleteProduct(p)}
                  className="delete-btn"
                />
              </td>
            </tr>
          ))}
          {paginatedProducts.length === 0 && (
            <tr>
              <td colSpan="12" style={{ textAlign: "center", padding: "1rem" }}>
                No products found.
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

      {/* Modales */}
      {showCreateModal && (
        <CreateProductModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreate}
          loading={loading}
          categories={categories}
        />
      )}
      {editProduct && (
        <EditProductModal
          product={editProduct}
          onClose={() => setEditProduct(null)}
          onSave={handleUpdate}
          loading={loading}
          categories={categories}
        />
      )}
      {deleteProduct && (
        <DeleteProductModal
          product={deleteProduct}
          onClose={() => setDeleteProduct(null)}
          onDelete={handleDelete}
          loading={loading}
        />
      )}
    </div>
  );
};

export default Product;
