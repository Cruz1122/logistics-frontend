import { useDispatch, useSelector } from "react-redux";
import { Suspense, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./components/layout/navbar/navbar";
import Footer from "./components/layout/footer/footer";
import { initializeUser, logoutUser, setAuthenticated } from "./redux/authSlice";
import "./App.css";
import { AppRoutes } from "./routes/AppRoutes";
import { useLocationTracking } from "./hooks/useLocationTracking";



function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const location = useLocation();

  useLocationTracking(); // rastrea la ubicación del repartidor

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(initializeUser(token));
    } else {
      dispatch(setAuthenticated(false));
      dispatch(logoutUser());
    }
  }, [dispatch]);

  const backgroundLocations = [
    "/",
    "/about",
    "/not-found",
    "/server-error",
    "/unauthorized",
    "/inactive",
  ];

  useEffect(() => {
    if (backgroundLocations.includes(location.pathname)) {
      document.body.classList.add("home-background");
    } else {
      document.body.classList.remove("home-background");
    }
  }, [location.pathname]);

  const isHome = location.pathname === "/";
  console.log("User is authenticated: ", isAuthenticated);

  return (
    <div className="app-container">
      <Navbar />
      <main className="container">
        {/* Solo se monta cuando loading === false */}
        <AppRoutes isAuthenticated={isAuthenticated} />
      </main>
      <Footer className={isHome ? "footer-home" : ""} />
    </div>
  );
}

export const FullScreenLoader = () => {
  return (
    <div className="loader">
      <div className="box box-1">
        <div className="side-left"></div>
        <div className="side-right"></div>
        <div className="side-top"></div>
      </div>
      <div className="box box-2">
        <div className="side-left"></div>
        <div className="side-right"></div>
        <div className="side-top"></div>
      </div>
      <div className="box box-3">
        <div className="side-left"></div>
        <div className="side-right"></div>
        <div className="side-top"></div>
      </div>
      <div className="box box-4">
        <div className="side-left"></div>
        <div className="side-right"></div>
        <div className="side-top"></div>
      </div>
    </div>
  );
};

export default App;
