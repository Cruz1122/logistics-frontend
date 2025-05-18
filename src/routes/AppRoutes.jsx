import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { lazy } from "react";

// Lazy load components - Auth
const SignIn = lazy(() => import("../features/Auth/signIn/signIn"));
const Home = lazy(() => import("../features/Home/home"));
const SignUp = lazy(() => import("../features/Auth/signUp/signUp"));
const About = lazy(() => import("../features/AboutUs/aboutUs"));
const VerifyEmail = lazy(() =>
  import("../features/Auth/verifyEmail/verifyEmail")
);
const VerifyCode = lazy(() => import("../features/Auth/verifyCode/verifyCode"));
const Forgot = lazy(() => import("../features/Auth/forgot/forgot"));
const ForgotVerifyCode = lazy(() =>
  import("../features/Auth/forgotVerifyCode/forgotVerifyCode")
);
const Dashboard = lazy(() => import("../features/Dashboard/dashboard"));
const NotFound = lazy(() => import("../components/errors/notFound/notFound"));
const ServerError = lazy(() =>
  import("../components/errors/serverError/serverError")
);
const Unauthorized = lazy(() =>
  import("../components/errors/unauthorized/unauthorized")
);
const User = lazy(() => import("../features/Management/User/user"));
const Permission = lazy(() =>
  import("../features/Management/Permission/permission")
);
const Role = lazy(() => import("../features/Management/Role/role"));
const RolPermission = lazy(() =>
  import("../features/Management/RolPermission/rolpermission")
);
const UserProfile = lazy(() => import("../features/UserProfile/userProfile"));
const ResetPassword = lazy(() =>
  import("../features/Auth/resetPassword/resetPassword")
);

// Lazy load components - Inventory
const Category = lazy(() => import("../features/Management/Category/category"));
const Supplier = lazy(() => import("../features/Management/Supplier/supplier"));

export const AppRoutes = ({ isAuthenticated }) => {
  const location = useLocation(); // ✅ Hook correcto

  const checkFlow = (state) => {
    return state?.fromFlow === true;
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/dashboard"
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
      />

      <Route
        path="/userProfile"
        element={isAuthenticated ? <UserProfile /> : <Navigate to="/" />}
      />

      <Route
        path="/reset-password"
        element={isAuthenticated ? <ResetPassword /> : <Navigate to="/" />}
      />

      <Route
        path="/usersPanel"
        element={isAuthenticated ? <User /> : <Navigate to="/" />}
      />

      <Route
        path="/permissionsPanel"
        element={isAuthenticated ? <Permission /> : <Navigate to="/" />}
      />

      <Route
        path="/rolesPanel"
        element={isAuthenticated ? <Role /> : <Navigate to="/" />}
      />

      <Route
        path="/roleXpermissionPanel"
        element={isAuthenticated ? <RolPermission /> : <Navigate to="/" />}
      />

      <Route
        path="/signin"
        element={!isAuthenticated ? <SignIn /> : <Navigate to="/" />}
      />
      <Route
        path="/signup"
        element={!isAuthenticated ? <SignUp /> : <Navigate to="/" />}
      />
      <Route
        path="/forgot"
        element={!isAuthenticated ? <Forgot /> : <Navigate to="/" />}
      />

      <Route path="/about" element={<About />} />

      <Route
        path="/verify-email"
        element={
          checkFlow(location.state) ? (
            <VerifyEmail />
          ) : (
            <Navigate to="/unauthorized" />
          )
        }
      />
      <Route
        path="/verify-code"
        element={
          checkFlow(location.state) ? (
            <VerifyCode />
          ) : (
            <Navigate to="/unauthorized" />
          )
        }
      />
      <Route
        path="/forgot-verify-code"
        element={
          checkFlow(location.state) ? (
            <ForgotVerifyCode />
          ) : (
            <Navigate to="/unauthorized" />
          )
        }
      />

      <Route
        path="/categoriesPanel"
        element={isAuthenticated ? <Category /> : <Navigate to="/" />}
      />

      <Route
        path="/suppliersPanel"
        element={isAuthenticated ? <Supplier /> : <Navigate to="/" />}
      />

      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/server-error" element={<ServerError />} />
      <Route path="/not-found" element={<NotFound />} />

      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  );
};
