import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight, FaArrowUp, FaShippingFast } from "react-icons/fa";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useSelector } from "react-redux";
import "./home.css";
import { getInfoOrder, getCoordsByAddress, getLatestLocation } from "../../api/locationService";

const Home = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const aboutSectionRef = useRef(null);
  const heroSectionRef = useRef(null);
  const navigate = useNavigate();

  // Estado para guardar el código ingresado
  const [trackingCode, setTrackingCode] = useState("");

  const handleTrackClick = async () => {
    if (trackingCode.trim() === "") {
      alert("Por favor ingresa un código de rastreo");
      return;
    }

    try {
      const order = await getInfoOrder(trackingCode);

      const deliveryId = order?.deliveryPerson?.id;

      if (!deliveryId) {
        alert("No se encontró un repartidor para este código de rastreo.");
        return;
      }
      const address = order?.deliveryAddress;

      const addressCoordinates = await getCoordsByAddress(address);
      if (!addressCoordinates) {
        alert("No se pudieron obtener las coordenadas de la dirección.");
        return;
      }

      const latestLocation = await getLatestLocation(deliveryId);

      if (order) {
        navigate(`/track/${deliveryId}`, { state: { fromFlow: true, addressCoordinates, latestLocation } }); // Navega al mapa
      } else {
        alert("Código de rastreo no válido o no encontrado.");
      }
    } catch (error) {
      console.error("Error al obtener la orden:", error);
      alert("Ocurrió un error al rastrear el pedido.");
    }
  };

  const scrollToAbout = () => {
    aboutSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToHero = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="home-page">
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
          {!isAuthenticated && (
            <div className="info-card">
              <h2>Create an account</h2>
              <AiOutlineUserAdd className="icon" />
              <p>Join us to manage your logistics needs.</p>
              <Link to="/signup" className="main-button">
                Sign Up <FaArrowRight className="arrow-icon" />
              </Link>
            </div>
          )}

          <div className="info-card">
            <h2>Track your shipments</h2>
            <FaShippingFast className="icon" />
            <p>Check the status of your deliveries here.</p>
            <input
              type="text"
              placeholder="Type your tracking code"
              value={trackingCode}
              onChange={(e) => setTrackingCode(e.target.value)}
            />
            <button className="main-button" onClick={handleTrackClick}>
              Track
            </button>
          </div>
        </div>

        <div className="about-section-container">
          <Link to="/about" className="main-button">
            About Us
          </Link>
        </div>
      </section>

      <section ref={aboutSectionRef} className="footer-section"></section>
    </div>
  );
};

export default Home;
