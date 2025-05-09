import { useSelector } from "react-redux";
import { Suspense, lazy, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./components/layout/navbar/navbar";
import Footer from "./components/layout/footer/footer";
import { AppRoutes } from "./routes/AppRoutes"; // Importamos el archivo de rutas
import "./App.css";

// Loader para Suspense
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
  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();

  // Rutas que deben mostrar la animación de fondo
  const backgroundLocations = [
    "/",
    "/about",
    "/not-found",
    "/server-error",
    "/unauthorized",
  ];

  // Cambiar el fondo según la ruta
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
          <AppRoutes isAuthenticated={isAuthenticated} /> {/* Usamos el componente de rutas */}
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
