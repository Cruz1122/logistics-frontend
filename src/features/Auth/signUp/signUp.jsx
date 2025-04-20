import React from "react";
import "./signUp.css";
import formImage from "../../../assets/backgrounds/form.png";
import { Link, useNavigate } from "react-router-dom"; // Importamos useNavigate

const SignUp = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí puedes agregar validaciones o llamadas a API si es necesario
    navigate("/verify-email"); // Redirige a la página de verificación de correo
  };

  return (
    <div className="signup-container">
      <div className="signup-image">
        <img src={formImage} alt="Form visual" />
      </div>

      {/* Línea divisoria */}
      <div className="vertical-divider"></div>

      <div className="signup-form">
        <div className="form-wrapper">
          <h2>Create new Account</h2>
          <p>
            Already Registered?{" "}
            <Link to="/signin" className="signin-link">
              Sign In
            </Link>
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input type="text" placeholder="First Name" required />
              <input type="text" placeholder="Last Name" required />
            </div>

            <input type="email" placeholder="Email" required />

            <div className="form-group">
              <select required style={{ width: "40%" }}>
                <option value="" disabled hidden>
                  Code
                </option>
                <option value="+57">🇨🇴 +57</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+33">🇫🇷 +33</option>
                <option value="+49">🇩🇪 +49</option>
                <option value="+34">🇪🇸 +34</option>
                <option value="+55">🇧🇷 +55</option>
                <option value="+91">🇮🇳 +91</option>
                <option value="+81">🇯🇵 +81</option>
                {/* Agrega más si necesitas */}
              </select>

              <input
                type="tel"
                placeholder="Phone Number"
                style={{ width: "68%" }}
                pattern="[0-9]*"
                inputMode="numeric"
                required
              />
            </div>

            <input type="password" placeholder="Password" required />

            <button type="submit" className="signup-button">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
