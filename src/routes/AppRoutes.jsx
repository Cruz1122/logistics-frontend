import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
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


export const AppRoutes = () => {
  const location = useLocation();

  const { isAuthenticated, permissions, loading } = useSelector((state) => state.auth);
  console.log("[AppRoutes] Loading:", loading);

  // Verificar si permisos están cargados (podría ser vacío pero aún así se puede decidir)
  // Si tus permisos pueden estar vacíos válidamente (ejemplo: usuario sin permisos),
  // podrías usar otra bandera de estado en redux que indique "permisos cargados"
  const permissionsLoaded = Array.isArray(permissions) && permissions.length > 0;
  console.log("[AppRoutes] permisos:", permissions);
  console.log("[AppRoutes] permisos cargados:", permissionsLoaded);


  if (loading || !permissionsLoaded) {
    return <div className="fullscreen-loader">Cargando...</div>;
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
        path="/ordersPanel"
        element={
          isAuthenticated && hasPermission("Order Management") ? (
            <Order />
          ) : (
            <Navigate to="/unauthorized" />
          )
        }
      />

      {/* Errores */}
      <Route path="/unauthorized" element={<Unauthorized />} /> 
      <Route path="/server-error" element={<ServerError />} />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  );
};