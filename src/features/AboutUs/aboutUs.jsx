import React from "react";
import "./aboutUs.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1>About LogicSmart360</h1>
        <p>
          LogicSmart360 is an integrated logistics management system designed to help
          distribution and delivery companies optimize their operations using geolocation,
          microservices architecture, and advanced analytics.
        </p>

        <p>
          Our platform provides tools for route planning, real-time shipment tracking, inventory
          management, and analytical reporting — all tailored for roles such as administrators,
          managers, dispatchers, and delivery personnel.
        </p>

        <p>
          Built with cutting-edge technologies like React, Node.js, and Google Maps API,
          LogicSmart360 ensures scalability, maintainability, and a smooth user experience.
        </p>

        <p>
          Join us and experience a smarter way to manage your logistics operations.
        </p>
      </div>
    </div>
  );
};

export default About;
