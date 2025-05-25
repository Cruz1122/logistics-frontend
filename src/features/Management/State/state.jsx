import React, { useState, useEffect } from "react";
import "./state.css";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";

import CreateStateModal from "./crud/create";
import EditStateModal from "./crud/edit";
import DeleteStateModal from "./crud/delete";

import {
  getAllStates,
  createState,
  updateState,
  deleteState as apiDeleteState,
} from "../../../api/state";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FullScreenLoader } from "../../../App";

const STATES_PER_PAGE = 5;

const State = () => {
  const [states, setStates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editState, setEditState] = useState(null);
  const [deleteState, setDeleteState] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchStates = async () => {
    try {
      setLoading(true);
      const rawStates = await getAllStates();

      const mappedStates = rawStates.map((state) => ({
        id: state.id,
        name: state.name,
      }));

      setStates(mappedStates);
    } catch (error) {
      toast.error("Error fetching states");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStates();
  }, []);

  const handleCreate = async (newStateData) => {
    try {
      setLoading(true);
      await createState(newStateData);
      await fetchStates();
      setShowCreateModal(false);
      toast.success("State created successfully");
    } catch (error) {
      toast.error("Error creating state");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (updatedStateData) => {
    try {
      setLoading(true);
      await updateState(editState.id, updatedStateData);
      await fetchStates();
      setEditState(null);
      toast.success("State updated successfully");
    } catch (error) {
      toast.error("Error updating state");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (stateToDelete) => {
    try {
      setLoading(true);
      await apiDeleteState(stateToDelete);
      await fetchStates();
      setDeleteState(null);
      setCurrentPage(1);
      toast.success("State deleted successfully");
    } catch (error) {
      toast.error("Error deleting state");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredStates = states.filter((state) =>
    state.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredStates.length / STATES_PER_PAGE);
  const startIndex = (currentPage - 1) * STATES_PER_PAGE;
  const paginatedStates = filteredStates.slice(
    startIndex,
    startIndex + STATES_PER_PAGE
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
    <div className="state-container">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="state-controls">
        <div className="search-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Search states..."
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
        <table className="state-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedStates.length > 0 ? (
              paginatedStates.map((state) => (
                <tr key={state.id} className="state-row">
                  <td>{state.name}</td>
                  <td>
                    <FaEdit
                      className="edit-btn"
                      onClick={() => setEditState(state)}
                    />
                    <FaTrash
                      className="delete-btn"
                      onClick={() => setDeleteState(state)}
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
                  No states found.
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
        <CreateStateModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreate}
          loading={loading}
        />
      )}
      {editState && (
        <EditStateModal
          state={editState}
          onClose={() => setEditState(null)}
          onSave={handleUpdate}
          loading={loading}
        />
      )}
      {deleteState && (
        <DeleteStateModal
          state={deleteState}
          onClose={() => setDeleteState(null)}
          onDelete={handleDelete}
          loading={loading}
        />
      )}
    </div>
  );
};

export default State;
