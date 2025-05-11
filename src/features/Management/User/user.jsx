import React, { useState, useEffect } from "react";
import "./user.css";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { MdCheckCircle, MdCancel } from "react-icons/md";
import CreateUserModal from "./crud/create";
import EditUserModal from "./crud/edit";
import DeleteUserModal from "./crud/delete";
import { getAllUsers } from "../../../api/user"; // Ajusta la ruta si es necesario

const USERS_PER_PAGE = 5;

const User = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const rawUsers = await getAllUsers();

      const mappedUsers = rawUsers.map((user) => ({
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        role: user.role?.name || "N/A",
        roleId: user.roleId,
        verified: !!user.emailVerified, // <- fuerza booleano
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }));

      setUsers(mappedUsers);
    };

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
      <div className="user-controls">
        <div className="search-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // reiniciar a la primera página en nueva búsqueda
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
                  onClick={() => setDeleteUser(user)}
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

      {/* Pagination controls */}
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
        <EditUserModal user={editUser} onClose={() => setEditUser(null)} />
      )}
      {deleteUser && (
        <DeleteUserModal
          user={deleteUser}
          onClose={() => setDeleteUser(null)}
        />
      )}
    </div>
  );
};

export default User;
