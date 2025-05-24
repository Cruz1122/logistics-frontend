import { useDispatch, useSelector } from "react-redux";
import { Suspense, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./components/layout/navbar/navbar";
import Footer from "./components/layout/footer/footer";
import { AppRoutes } from "./routes/AppRoutes";
import { initializeUser, logoutUser, setAuthenticated } from "./redux/authSlice";
import "./App.css";

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

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(initializeUser(token));
    } else {
      dispatch(setAuthenticated(false));
      dispatch(logoutUser());
    }
  }, [dispatch]);

  console.log("[App] Estado de autenticación:", isAuthenticated);

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

  return (
    <div className="app-container">
      <Navbar />
      <main className="container">
        <Suspense fallback={<FullScreenLoader />}>
          <AppRoutes isAuthenticated={isAuthenticated} />
        </Suspense>
      </main>
      <Footer className={isHome ? "footer-home" : ""} />
    </div>
  );
}

export default App;
