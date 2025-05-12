import React, { useState, useEffect } from "react";
import "./user.css";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { MdCheckCircle, MdCancel } from "react-icons/md";
import CreateUserModal from "./crud/create";
import EditUserModal from "./crud/edit";
import DeleteUserModal from "./crud/delete";
import { getAllUsers, updateUser, deleteUser as deleteUserApi } from "../../../api/user"; // Renombramos deleteUser a deleteUserApi
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const USERS_PER_PAGE = 5;

const User = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null); // Renombrado aquí

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
      toast.error("Error fetching users");
    }
  };

  const handleDelete = async (user) => {
    try {
      console.log("Deleting user:", user);
      
      await deleteUserApi(user.id);  // Llamamos a la función deleteUserApi pasando el ID del usuario
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id)); // Actualizamos el estado eliminando el usuario
      toast.success("User deleted successfully!");
    } catch (error) {
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
              <td className="icon-actions">
                <button className="icon-btn" onClick={() => setEditUser(user)}>
                  <FaEdit />
                </button>
                <button
                  className="icon-btn"
                  onClick={() => setUserToDelete(user)} // Usamos userToDelete
                >
                  <FaTrash />
                </button>
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
        <CreateUserModal onClose={() => setShowCreateModal(false)} />
      )}

      {editUser && (
        <EditUserModal
          user={editUser}
          onClose={() => setEditUser(null)}
          onSave={async (formData) => {
            try {
              console.log("Form data to save:", formData);
              await updateUser(formData.id, formData);
              await fetchUsers();
              toast.success("User updated successfully!");
            } catch (error) {
              console.error("Error al guardar cambios:", error);
              toast.error("Failed to update user");
            } finally {
              setEditUser(null);
            }
          }}
        />
      )}

      {userToDelete && (  // Cambiamos deleteUser a userToDelete
        <DeleteUserModal
          user={userToDelete}
          onClose={() => setUserToDelete(null)} // Cambiamos deleteUser a userToDelete
          onDelete={handleDelete} // Pasamos handleDelete aquí
        />
      )}
    </div>
  );
};

export default User;
