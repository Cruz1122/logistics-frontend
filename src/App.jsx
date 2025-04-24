import { React, useEffect, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Layout/navbar/navbar";
import Footer from "./components/Layout/footer/footer";
import Home from "./features/Home/home";
import SignUp from "./features/Auth/signUp/signUp";

// Lazy loading para los componentes necesarios
const SignIn = lazy(() => import("./features/Auth/signIn/signIn"));
const About = lazy(() => import("./features/aboutUs/aboutUs"));
const VerifyEmail = lazy(() =>
  import("./features/Auth/verifyEmail/verifyEmail")
);
const VerifyCode = lazy(() => import("./features/Auth/verifyCode/verifyCode"));
const Forgot = lazy(() => import("./features/Auth/forgot/forgot"));
const FullScreenLoader = () => (
  <div
    style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <div className="spinner"></div>
  </div>
);


import "./App.css";

function App() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/about") {
      document.body.classList.add("home-background");
    } else {
      document.body.classList.remove("home-background");
    }
  }, [location.pathname]);

  return (
    <div className="app-container">
      <Navbar />

      <main className="container">
        <Suspense fallback={<FullScreenLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/about" element={<About />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/verify-code" element={<VerifyCode />} />
            <Route path="/forgot-password" element={<Forgot />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}

export default App;
