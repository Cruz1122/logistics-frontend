import React, { useState } from "react";
import "./signUp.css";
import formImage from "../../../assets/backgrounds/form.webp";
import { Link, useNavigate } from "react-router-dom";
import { signUpRequest } from "../../../api/auth";
import { toast } from "react-toastify";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    code: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;

    if (!passwordRegex.test(form.password)) {
      toast.warn(
        "Password must be at least 6 characters, include uppercase, lowercase, number and special character"
      );
      return;
    }

    try {
      const fullPhone = `${form.code}${form.phone}`;
      const payload = {
        name: form.name,
        lastName: form.lastName,
        email: form.email,
        phone: fullPhone,
        password: form.password,
      };

      // Hacemos la solicitud de registro
      await signUpRequest(payload);

      // Mostramos un mensaje de éxito
      toast.success("Account created successfully!");

      // Redirigimos a la página de verificación de correo
      navigate("/verify-email", { state: { email: form.email } });
    } catch (err) {
      setError(err.response?.data?.error || "Error registering user");
      toast.error("Something went wrong during registration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-image">
        <img src={formImage} alt="Form visual" />
      </div>

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
            {/* Campos del formulario */}
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="First Name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <div className="form-group">
              <select
                name="code"
                required
                value={form.code}
                onChange={handleChange}
              >
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
              </select>

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                required
                pattern="[0-9]*"
                inputMode="numeric"
              />
            </div>

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}"
              title="Min 6 characters with uppercase, lowercase, number and special character"
            />

            <button type="submit" disabled={loading} className="signup-button">
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
