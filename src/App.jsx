import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/navbar/navbar';
import Footer from './components/Layout/footer/footer';

import SignIn from './features/Auth/signIn/signIn'; // ← ruta real
import SignUp from './features/Auth/signUp/signUp'; // ← ruta real
import Home from './features/Home/home';            // ← ruta real
import About from './features/aboutUs/aboutUs'; // ← nueva línea
import VerifyEmail from './features/Auth/verifyEmail/verifyEmail'; // ← nueva línea
import VerifyCode from './features/Auth/verifyCode/verifyCode'; // ← nueva línea

import './App.css';

function App() {
  return (
      <div className="app-container">
        <Navbar />

        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/about" element={<About />} /> 
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/verify-code" element={<VerifyCode />} />
            {/* Puedes agregar más rutas aquí */}
          </Routes>
        </main>

        <Footer />
      </div>
  );
}

export default App;
