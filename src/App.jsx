import { React, useEffect, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/layout/navbar/navbar";
import Footer from "./components/layout/footer/footer";
import Home from "./features/Home/home";

// Lazy loading para los componentes necesarios
const SignIn = lazy(() => import("./features/Auth/signIn/signIn"));
const SignUp = lazy(() => import("./features/Auth/signUp/signUp"));
const About = lazy(() => import("./features/aboutUs/aboutUs"));
const VerifyEmail = lazy(() => import("./features/Auth/verifyEmail/verifyEmail"));
const VerifyCode = lazy(() => import("./features/Auth/verifyCode/verifyCode"));
const Forgot = lazy(() => import("./features/Auth/forgot/forgot"));
const NotFound = lazy(() => import("./components/errors/notFound/notFound"));
const ServerError = lazy(() =>  import("./components/errors/serverError/serverError"));
const Unauthorized = lazy(() => import("./components/errors/unauthorized/unauthorized"));

const FullScreenLoader = () => (
  <div
    style={{
      height: "82.4vh",
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
  const backgroundLocations = [
    "/",
    "/about",
    "/not-found",
    "/server-error",
    "/unauthorized",
  ];

  useEffect(() => {
    if (backgroundLocations.includes(location.pathname)) {
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
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/server-error" element={<ServerError />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/not-found" replace />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}

export default App;
