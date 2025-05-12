import React, { useState, useEffect } from "react";
import "./user.css";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { MdCheckCircle, MdCancel } from "react-icons/md";
import CreateUserModal from "./crud/create";
import EditUserModal from "./crud/edit";
import DeleteUserModal from "./crud/delete";
import {
  getAllUsers,
  updateUser,
  deleteUser as deleteUserApi,
  createUser,
} from "../../../api/user";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const USERS_PER_PAGE = 5;

const roleNameToId = {
  Admin: "4d36f126-e3c0-4740-8ef0-215dbf71733f",
  Delivery: "efa6e130-69ef-4386-b035-fbb6f268c016",
  Dispatcher: "5208d160-41e8-40a1-a813-7fa601331b9e",
  Manager: "bab8aee4-0d03-4fc8-94a3-2118b3b4ea69",
  Guest: "2b406949-6340-4801-ac31-06449644a6a4",
};

const User = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);

  const fetchUsers = async () => {
    try {
      const rawUsers = await getAllUsers();
      const mappedUsers = rawUsers.map((user) => ({
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        role: user.role?.name || "N/A",
        roleId: user.roleId,
        verified: !!user.emailVerified,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }));
      setUsers(mappedUsers);
    } catch (err) {
      console.error("Error fetching users:", err);
      toast.error("Error fetching users");
    }
  };

  const handleDelete = async (user) => {
    try {
      await deleteUserApi(user.id);
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
      toast.success("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    Object.values(user)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + USERS_PER_PAGE
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="user-container">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="user-controls">
        <div className="search-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Search..."
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

      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Verified</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((user, index) => (
            <tr key={index} className="user-row">
              <td>{`${user.name} ${user.lastName}`}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.role}</td>
              <td>
                {user.verified ? (
                  <MdCheckCircle size={24} color="#5edd60" />
                ) : (
                  <MdCancel size={24} color="red" />
                )}
              </td>
              <td>
                  <FaEdit
                    className="edit-btn"
                    onClick={() => setEditUser(user)}
                  />
                  <FaTrash
                    className="delete-btn"
                    onClick={() => setUserToDelete(user)}
                  />
              </td>
            </tr>
          ))}
          {paginatedUsers.length === 0 && (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "1rem" }}>
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

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
        <CreateUserModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onCreate={async (formData) => {
            try {
              const roleId = roleNameToId[formData.role];
              if (!roleId) throw new Error("Invalid role selected");

              const userToCreate = {
                ...formData,
                roleId,
              };

              await createUser(userToCreate);
              await fetchUsers();
              toast.success("User created successfully!");
            } catch (error) {
              console.error("Error creating user:", error);
              toast.error("Failed to create user");
            } finally {
              setShowCreateModal(false);
            }
          }}
        />
      )}

      {editUser && (
        <EditUserModal
          user={editUser}
          onClose={() => setEditUser(null)}
          onSave={async (formData) => {
            try {
              await updateUser(formData.id, formData);
              await fetchUsers();
              toast.success("User updated successfully!");
            } catch (error) {
              console.error("Error updating user:", error);
              toast.error("Failed to update user");
            } finally {
              setEditUser(null);
            }
          }}
        />
      )}

      {userToDelete && (
        <DeleteUserModal
          user={userToDelete}
          onClose={() => setUserToDelete(null)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default User;
