import { useDispatch, useSelector } from "react-redux"; // 👈 IMPORTA useDispatch
import { Suspense, lazy, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./components/layout/navbar/navbar";
import Footer from "./components/layout/footer/footer";
import { AppRoutes } from "./routes/AppRoutes";
import { setUser, setAuthenticated } from "./redux/authSlice"; // 👈 Asegúrate de importar tus acciones
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
  const dispatch = useDispatch(); // 👈 DEFINIR dispatch AQUÍ
  const { isAuthenticated } = useSelector((state) => state.auth);
  
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(setUser({ token }));
    } else {
      dispatch(setAuthenticated(false));
      dispatch(setUser({ token: null}));
    }

  }, [dispatch]);

  console.log("[App] Estado de autenticación:", isAuthenticated);

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
