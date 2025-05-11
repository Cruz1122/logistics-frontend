import React, { useState } from "react";
import "./user.css";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { MdCheckCircle, MdCancel } from "react-icons/md";
import CreateUserModal from "./crud/createUserModal";
import EditUserModal from "./crud/editUserModal";
import DeleteUserModal from "./crud/deleteUserModal";

const usersData = [
  {
    name: "Laura Gómez",
    email: "laura.gomez@example.com",
    phone: "+57 310 456 7890",
    role: "Admin",
    verified: true,
  },
  {
    name: "Diana Martínez",
    email: "diana.martinez@example.com",
    phone: "+57 315 678 4321",
    role: "Dealer",
    verified: true,
  },
  {
    name: "Andrés Salazar",
    email: "andres.salazar@example.com",
    phone: "+57 320 987 6543",
    role: "Support",
    verified: false,
  },
];

const User = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);

  const filteredUsers = usersData.filter((user) =>
    Object.values(user)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-container">
      <div className="user-controls">
        <div className="search-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
          {filteredUsers.map((user, index) => (
            <tr key={index} className="user-row">
              <td>{user.name}</td>
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
                <button className="icon-btn" onClick={() => setDeleteUser(user)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
          {filteredUsers.length === 0 && (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "1rem" }}>
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modales */}
      {showCreateModal && (
        <CreateUserModal onClose={() => setShowCreateModal(false)} />
      )}
      {editUser && (
        <EditUserModal user={editUser} onClose={() => setEditUser(null)} />
      )}
      {deleteUser && (
        <DeleteUserModal user={deleteUser} onClose={() => setDeleteUser(null)} />
      )}
    </div>
  );
};

export default User;
