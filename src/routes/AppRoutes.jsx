import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser, setAuthenticated } from "../redux/authSlice";
import { lazy, useEffect } from "react";
import PropTypes from "prop-types";
import { FullScreenLoader } from "../App";
import MapView from "../components/maps/TrackingMap";

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
const Inactive = lazy(() => import("../components/errors/inactive/inactive"));
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
const Warehouse = lazy(() =>
  import("../features/Management/Warehouse/warehouse")
);
const Product = lazy(() => import("../features/Management/Product/product"));
const ProductSupplier = lazy(() =>
  import("../features/Management/ProductSupplier/productSupplier")
);
const ProductWarehouse = lazy(() =>
  import("../features/Management/ProductWarehouse/productwarehouse")
);
const ProductWarehouseMovement = lazy(() =>
  import(
    "../features/Management/ProductWarehouseMovement/productwarehousemovement"
  )
);

// Lazy load components - Orders
const Deliveryperson = lazy(() =>
  import("../features/Management/DeliveryPerson/deliveryperson")
);
const Order = lazy(() => import("../features/Management/Order/order"));
const ProtectedRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/" />;
};

// Lazy load for deliveryManagement
export const DeliveryManagement = lazy(() =>
  import("../features/Management/DeliveryManagement/deliveryManagement")
);

ProtectedRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

const PublicRoute = ({ isAuthenticated, children }) => {
  return !isAuthenticated ? children : <Navigate to="/" />;
};

const FlowRoute = ({ children }) => {
  const location = useLocation();
  return location.state?.fromFlow === true ? (
    children
  ) : (
    <Navigate to="/unauthorized" />
  );
};

export const AppRoutes = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { isAuthenticated, permissions, loading } = useSelector(
    (state) => state.auth
  );
  console.log("[AppRoutes] Loading:", loading);

  // Verificar si permisos están cargados (podría ser vacío pero aún así se puede decidir)
  // Si tus permisos pueden estar vacíos válidamente (ejemplo: usuario sin permisos),
  // podrías usar otra bandera de estado en redux que indique "permisos cargados"
  const permissionsLoaded =
    Array.isArray(permissions) && permissions.length > 0;
  console.log("[AppRoutes] permisos:", permissions);
  console.log("[AppRoutes] permisos cargados:", permissionsLoaded);
  useEffect(() => {
    if (!loading &&  (!permissionsLoaded || permissions.length === 0)) {
      // Aquí forzamos el logout
      dispatch(setAuthenticated(false));
      dispatch(logoutUser());
    }
  }, [loading, permissionsLoaded, permissions, dispatch]);

    if (isAuthenticated && !permissionsLoaded) {
        return <FullScreenLoader />;
    }
    const hasPermission = (permName) => {
      return permissions.some((p) => p.name === permName);
    };

  const checkFlow = (state) => {
    return state?.fromFlow === true;
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />

      {/* Paneles protegidos generales */}
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

      {/* Gestión de usuarios */}
      <Route
        path="/usersPanel"
        element={
          isAuthenticated && hasPermission("User Management") ? (
            <User />
          ) : (
            <Navigate to="/unauthorized" />
          )
        }
      />
      <Route
        path="/permissionsPanel"
        element={
          isAuthenticated && hasPermission("Permissions Management") ? (
            <Permission />
          ) : (
            <Navigate to="/unauthorized" />
          )
        }
      />
      <Route
        path="/rolesPanel"
        element={
          isAuthenticated && hasPermission("Role Management") ? (
            <Role />
          ) : (
            <Navigate to="/unauthorized" />
          )
        }
      />
      <Route
        path="/roleXpermissionPanel"
        element={
          isAuthenticated && hasPermission("Role-Permission Management") ? (
            <RolPermission />
          ) : (
            <Navigate to="/unauthorized" />
          )
        }
      />

      {/* Gestión de inventario */}
      <Route
        path="/categoriesPanel"
        element={
          isAuthenticated && hasPermission("Category Management") ? (
            <Category />
          ) : (
            <Navigate to="/unauthorized" />
          )
        }
      />
      <Route
        path="/suppliersPanel"
        element={
          isAuthenticated && hasPermission("Supplier Management") ? (
            <Supplier />
          ) : (
            <Navigate to="/unauthorized" />
          )
        }
      />
      <Route
        path="/statesPanel"
        element={
          isAuthenticated && hasPermission("State Management") ? (
            <State />
          ) : (
            <Navigate to="/unauthorized" />
          )
        }
      />
      <Route
        path="/citiesPanel"
        element={
          isAuthenticated && hasPermission("City Management") ? (
            <City />
          ) : (
            <Navigate to="/unauthorized" />
          )
        }
      />
      <Route
        path="/warehousesPanel"
        element={
          isAuthenticated && hasPermission("Warehouse Management") ? (
            <Warehouse />
          ) : (
            <Navigate to="/unauthorized" />
          )
        }
      />
      <Route
        path="/productsPanel"
        element={
          isAuthenticated && hasPermission("Product Management") ? (
            <Product />
          ) : (
            <Navigate to="/unauthorized" />
          )
        }
      />
      <Route
        path="/productSuppliersPanel"
        element={
          isAuthenticated && hasPermission("Product-Supplier Management") ? (
            <ProductSupplier />
          ) : (
            <Navigate to="/unauthorized" />
          )
        }
      />
      <Route
        path="/productWarehousesPanel"
        element={
          isAuthenticated && hasPermission("Product-Warehouse Management") ? (
            <ProductWarehouse />
          ) : (
            <Navigate to="/unauthorized" />
          )
        }
      />
      <Route
        path="/productWarehouseMovementsPanel"
        element={
          isAuthenticated && hasPermission("Product-Movements Management") ? (
            <ProductWarehouseMovement />
          ) : (
            <Navigate to="/unauthorized" />
          )
        }
      />

      {/* Órdenes y entregas */}
      <Route
        path="/deliveriesPanel"
        element={
          isAuthenticated && hasPermission("Delivery-Person Management") ? (
            <Deliveryperson />
          ) : (
            <Navigate to="/unauthorized" />
          )
        }
      />

      <Route
        path="/deliveryManagement"
        element={
          isAuthenticated && hasPermission("Delivery-Person Management") ? (
            <DeliveryManagement />
          ) : (
            <Navigate to="/unauthorized" />
          )
        }
      />

      <Route
        path="/ordersPanel"
        element={
          isAuthenticated && hasPermission("Order Management") ? (
            <Order />
          ) : (
            <Navigate to="/unauthorized" />
          )
        }
      />

      {/* Rutas públicas y de flujo */}
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
        path="/track/:deliveryId"
        element={
          <FlowRoute>
            <MapView />
          </FlowRoute>
        }
      />

      {/* Errores */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/server-error" element={<ServerError />} />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="/inactive" element={<Inactive />} />
      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  );
};
