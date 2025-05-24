import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { lazy } from "react";
import PropTypes from "prop-types";

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
const Inactive = lazy(() =>
  import("../components/errors/inactive/inactive")
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
const State = lazy(() => import("../features/Management/State/state"));
const City = lazy(() => import("../features/Management/City/city"));
const Warehouse = lazy(() => import("../features/Management/Warehouse/warehouse"));
const Product = lazy(() => import("../features/Management/Product/product"));
const ProductSupplier = lazy(() => import("../features/Management/ProductSupplier/productSupplier"));
const ProductWarehouse = lazy(() => import("../features/Management/ProductWarehouse/productwarehouse"));
const ProductWarehouseMovement = lazy(() => import("../features/Management/ProductWarehouseMovement/productwarehousemovement"));

// Lazy load components - Orders
const Deliveryperson = lazy(() => import("../features/Management/DeliveryPerson/deliveryperson"));
const Order = lazy(() => import("../features/Management/Order/order"));
const ProtectedRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/" />;
};

ProtectedRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

const PublicRoute = ({ isAuthenticated, children }) => {
  return !isAuthenticated ? children : <Navigate to="/" />;
};

const FlowRoute = ({ children }) => {
  const location = useLocation();
  return location.state?.fromFlow === true ? children : <Navigate to="/unauthorized" />;
};

export const AppRoutes = ({ isAuthenticated }) => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/userProfile"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <UserProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/reset-password"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <ResetPassword />
          </ProtectedRoute>
        }
      />

      <Route
        path="/usersPanel"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <User />
          </ProtectedRoute>
        }
      />

      <Route
        path="/permissionsPanel"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Permission />
          </ProtectedRoute>
        }
      />

      <Route
        path="/rolesPanel"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Role />
          </ProtectedRoute>
        }
      />

      <Route
        path="/roleXpermissionPanel"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <RolPermission />
          </ProtectedRoute>
        }
      />

      <Route
        path="/signin"
        element={
          <PublicRoute isAuthenticated={isAuthenticated}>
            <SignIn />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute isAuthenticated={isAuthenticated}>
            <SignUp />
          </PublicRoute>
        }
      />
      <Route
        path="/forgot"
        element={
          <PublicRoute isAuthenticated={isAuthenticated}>
            <Forgot />
          </PublicRoute>
        }
      />

      <Route path="/about" element={<About />} />

      <Route
        path="/verify-email"
        element={
          <FlowRoute>
            <VerifyEmail />
          </FlowRoute>
        }
      />
      <Route
        path="/verify-code"
        element={
          <FlowRoute>
            <VerifyCode />
          </FlowRoute>
        }
      />
      <Route
        path="/forgot-verify-code"
        element={
          <FlowRoute>
            <ForgotVerifyCode />
          </FlowRoute>
        }
      />

      <Route
        path="/categoriesPanel"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Category />
          </ProtectedRoute>
        }
      />

      <Route
        path="/suppliersPanel"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Supplier />
          </ProtectedRoute>
        }
      />

      <Route
        path="/statesPanel"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <State />
          </ProtectedRoute>
        }
      />

      <Route
        path="/citiesPanel"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <City />
          </ProtectedRoute>
        }
      />

      <Route
        path="/warehousesPanel"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Warehouse />
          </ProtectedRoute>
        }
      />

      <Route
        path="/productsPanel"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Product />
          </ProtectedRoute>
        }
      />

      <Route
        path="/productSuppliersPanel"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <ProductSupplier />
          </ProtectedRoute>
        }
      />

      <Route
        path="/productWarehousesPanel"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <ProductWarehouse />
          </ProtectedRoute>
        }
      />

      <Route
        path="/productWarehouseMovementsPanel"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <ProductWarehouseMovement />
          </ProtectedRoute>
        }
      />

      <Route
        path="/deliveriesPanel"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Deliveryperson />
          </ProtectedRoute>
        }
      />

      <Route
        path="/ordersPanel"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Order />
          </ProtectedRoute>
        }
      />

      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/server-error" element={<ServerError />} />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="/inactive" element={<Inactive />} />

      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  );
};