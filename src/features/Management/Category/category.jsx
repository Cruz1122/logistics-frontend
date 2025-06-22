import React, { useState, useEffect } from "react";
import "./category.css";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import CreateCategoryModal from "./crud/create";
import EditCategoryModal from "./crud/edit";
import DeleteCategoryModal from "./crud/delete";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory as apiDeleteCategory,
} from "../../../api/category";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FullScreenLoader } from "../../../App";

const CATEGORIES_PER_PAGE = 5;

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [deleteCategory, setDeleteCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const rawCategories = await getAllCategories();

      const mappedCategories = rawCategories.map((category) => ({
        id: category.id,
        name: category.name,
      }));

      setCategories(mappedCategories);
    } catch (error) {
      toast.error("Error fetching categories");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = async (newCategoryData) => {
    try {
      setLoading(true);
      await createCategory(newCategoryData);
      await fetchCategories();
      setShowCreateModal(false);
      toast.success("Category created successfully");
    } catch (error) {
      toast.error("Error creating category");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (updatedCategoryData) => {
    try {
      setLoading(true);
      await updateCategory(editCategory.id, updatedCategoryData);
      await fetchCategories();
      setEditCategory(null);
      toast.success("Category updated successfully");
    } catch (error) {
      toast.error("Error updating category");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (categoryToDelete) => {
    try {
      setLoading(true);
      await apiDeleteCategory(categoryToDelete.id);
      await fetchCategories();
      setDeleteCategory(null);
      setCurrentPage(1);
      toast.success("Category deleted successfully");
    } catch (error) {
      toast.error("Error deleting category");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCategories.length / CATEGORIES_PER_PAGE);
  const startIndex = (currentPage - 1) * CATEGORIES_PER_PAGE;
  const paginatedCategories = filteredCategories.slice(
    startIndex,
    startIndex + CATEGORIES_PER_PAGE
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading && categories.length === 0) {
    return <FullScreenLoader />;
  }

  return (
    <div className="category-container">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="category-controls">
        <div className="search-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Search categories..."
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
        <table className="category-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCategories.length > 0 ? (
              paginatedCategories.map((category) => (
                <tr key={category.id} className="category-row">
                  <td>{category.name}</td>
                  <td>
                    <FaEdit
                      className="edit-btn"
                      onClick={() => setEditCategory(category)}
                    />
                    <FaTrash
                      className="delete-btn"
                      onClick={() => setDeleteCategory(category)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="2"
                  style={{ textAlign: "center", padding: "1rem" }}
                >
                  No categories found.
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
        <CreateCategoryModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreate}
          loading={loading}
        />
      )}
      {editCategory && (
        <EditCategoryModal
          category={editCategory}
          onClose={() => setEditCategory(null)}
          onSave={handleUpdate}
          loading={loading}
        />
      )}
      {deleteCategory && (
        <DeleteCategoryModal
          category={deleteCategory}
          onClose={() => setDeleteCategory(null)}
          onDelete={handleDelete}
          loading={loading}
        />
      )}
    </div>
  );
};

export default Category;
