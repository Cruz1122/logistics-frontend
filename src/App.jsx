import React from 'react';
import Navbar from './components/Layout/navbar/navbar';
import Footer from './components/Layout/footer/footer';
import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="app-container">
      <Navbar />

      <main className="container">
        <h1>Welcome To LogicSmart360</h1>
        <p>Sign in or create an account to start using our logistics platform</p>
        <Link to="/about" className="main-button">
          About Us <span className="arrow">→</span>
        </Link>
      </main>

      <Footer />
    </div>
  );
}

export default App;
