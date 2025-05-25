import React, { useState, useEffect } from "react";
import "./product.css";
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
import { FullScreenLoader } from "../../../App";

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

  // Carga inicial combinada
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const [categoriesRes, productsRes] = await Promise.all([
          getAllCategories(),
          getAllProducts(),
        ]);

        const sortedCategories = categoriesRes.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setCategories(sortedCategories);

        const mappedProducts = productsRes.map((product) => {
          const category = sortedCategories.find(
            (c) => c.id === product.categoryId
          );
          return {
            ...product,
            categoryName: category ? category.name : "Unknown",
          };
        });

        setProducts(mappedProducts);
      } catch (error) {
        toast.error("Error loading initial data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  // Refrescar productos usando categorías ya cargadas
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const productsRes = await getAllProducts();
      const mappedProducts = productsRes.map((product) => {
        const category = categories.find((c) => c.id === product.categoryId);
        return {
          ...product,
          categoryName: category ? category.name : "Unknown",
        };
      });
      setProducts(mappedProducts);
    } catch (error) {
      toast.error("Error fetching products");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data) => {
    try {
      setLoading(true);
      await createProduct(data);
      await fetchProducts();
      setShowCreateModal(false);
      toast.success("Product created");
    } catch (error) {
      toast.error("Error creating product");
      console.error(error);
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
      console.error(error);
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
      console.error(error);
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

  if (loading) {
    return <FullScreenLoader />;
  }

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
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map((p) => (
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
              ))
            ) : (
              <tr>
                <td
                  colSpan="12"
                  style={{ textAlign: "center", padding: "1rem" }}
                >
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