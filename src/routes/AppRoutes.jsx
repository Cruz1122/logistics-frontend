import { Routes, Route, Navigate } from "react-router-dom";
import { lazy } from "react";

// Lazy loading de componentes
const SignIn = lazy(() => import("../features/Auth/signIn/signIn"));
const Home = lazy(() => import("../features/Home/home"));
const SignUp = lazy(() => import("../features/Auth/signUp/signUp"));
const About = lazy(() => import("../features/aboutUs/aboutUs"));
const VerifyEmail = lazy(() => import("../features/Auth/verifyEmail/verifyEmail"));
const VerifyCode = lazy(() => import("../features/Auth/verifyCode/verifyCode"));
const Forgot = lazy(() => import("../features/Auth/forgot/forgot"));
const Dashboard = lazy(() => import("../features/Dashboard/dashboard"));
const NotFound = lazy(() => import("../components/errors/notFound/notFound"));
const ServerError = lazy(() => import("../components/errors/serverError/serverError"));
const Unauthorized = lazy(() => import("../components/errors/unauthorized/unauthorized"));

export const AppRoutes = ({ isAuthenticated }) => {
  return (
    <Routes>
      {/* Página de inicio (Home pública) */}
      <Route path="/" element={<Home />} />

      {/* Panel de administración (protegido) */}
      <Route
        path="/admin"
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
      />

      {/* Autenticación */}
      <Route
        path="/signin"
        element={!isAuthenticated ? <SignIn /> : <Navigate to="/admin" />}
      />
      <Route
        path="/signup"
        element={!isAuthenticated ? <SignUp /> : <Navigate to="/admin" />}
      />

      {/* Rutas públicas */}
      <Route path="/about" element={<About />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/verify-code" element={<VerifyCode />} />
      <Route path="/forgot-password" element={<Forgot />} />

      {/* Rutas de error */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/server-error" element={<ServerError />} />
      <Route path="/not-found" element={<NotFound />} />

      {/* Ruta catch-all */}
      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  );
};
