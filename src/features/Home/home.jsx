import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaArrowUp, FaShippingFast } from "react-icons/fa";
import { AiOutlineUserAdd } from "react-icons/ai";
import Footer from "../../components/layout/footer/footer";
import { useSelector } from "react-redux"; // 👈 Importamos useSelector
import "./home.css";

const Home = () => {
  const { isAuthenticated } = useSelector((state) => state.auth); // 👈 Obtenemos el estado de autenticación
  const aboutSectionRef = useRef(null);
  const heroSectionRef = useRef(null);

  const scrollToAbout = () => {
    aboutSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToHero = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section ref={heroSectionRef} className="hero-section">
        <div className="home-container">
          <h1>Welcome To LogicSmart360</h1>
          <p>
            {isAuthenticated
              ? "You are logged in. Manage your logistics and deliveries now!"
              : "Sign in or create an account to start using our logistics platform"}
          </p>
          <button onClick={scrollToAbout} className="main-button">
            Learn more <FaArrowRight className="arrow-icon" />
          </button>
        </div>
      </section>

      <section className="info-section">
        <button onClick={scrollToHero} className="main-button">
          Back to Top <FaArrowUp className="arrow-icon" />
        </button>

        <div className="card-container">
          <div className="info-card">
            <h2>Create an account</h2>

            <AiOutlineUserAdd className="icon" />

            <p>Join us to manage your logistics needs.</p>

            <Link to="/signup" className="main-button">
              Sign Up <FaArrowRight className="arrow-icon" />
            </Link>
          </div>

          <div className="info-card">
            <h2>Track your shipments</h2>

            <FaShippingFast className="icon" />

            <p>Check the status of your deliveries here.</p>

            <input type="text" placeholder="Type your tracking code" />

            <button className="main-button">Track</button>
          </div>
        </div>
        <div className="about-section-container">
          <Link to="/about" className="main-button">
            About Us
          </Link>
        </div>
      </section>

      {/* Footer Section */}
      <section ref={aboutSectionRef} className="footer-section">
      </section>
    </div>
  );
};

export default Home;
