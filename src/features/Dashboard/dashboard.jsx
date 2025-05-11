import React from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./dashboard.css";
import { CardData } from "./cardData";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleButtonClick = (title) => {
    if (title === "Users") {
      navigate("/usersPanel");
    } else {
      toast.info(`No route configured for "${title}"`, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="dashboard-container">
      <ToastContainer />
      <div className="cards-grid">
        {CardData.map((card, index) => (
          <div className="dashboard-card" key={index}>
            <div className="card-icon">{card.icon}</div>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            <button
              className="card-button"
              onClick={() => handleButtonClick(card.title)}
            >
              Manage
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
