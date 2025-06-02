import React, { useState, useEffect } from "react";
import "./signUp.css";
import formImage from "../../../assets/backgrounds/form.webp";
import { Link, useNavigate } from "react-router-dom";
import { signUpRequest } from "../../../api/auth";
import { getAllCities } from "../../../api/city"; // Asegúrate de tener esta función
import { toast } from "react-toastify";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    code: "",
    password: "",
    cityId: "",
  });

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const data = await getAllCities();
        setCities(data.sort((a, b) => a.name.localeCompare(b.name)));
      } catch (err) {
        toast.error("Error loading cities");
      }
    };

    fetchCities();
  }, []);

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
      setLoading(false);
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
        cityId: form.cityId,
      };

      await signUpRequest(payload);

      toast.success("Account created successfully!");

      navigate("/verify-email", {
        state: { email: form.email, fromFlow: true },
      });
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

            <select
              name="cityId"
              value={form.cityId}
              onChange={handleChange}
              required
            >
              <option value="" disabled hidden>
                Select City
              </option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>

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
