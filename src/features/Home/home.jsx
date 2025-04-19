import React from 'react';
import { Link } from 'react-router-dom'; // ← IMPORTANTE
import { FaArrowRight } from 'react-icons/fa'; // ← IMPORTANTE
import './home.css'; // ← IMPORTANTE

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome To LogicSmart360</h1>
      <p>Sign in or create an account to start using our logistics platform</p>
      <Link to="/about" className="main-button">
        About Us <FaArrowRight className="arrow-icon" />
      </Link>
    </div>
  );
};

export default Home;
