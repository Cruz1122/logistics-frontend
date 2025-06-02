import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserRolId } from "../api/auth"; // Ajusta la ruta si es necesario
import { getUserPermissions, getUserIdFromToken } from "../api/user"; // Ajusta la ruta si es necesario

const initialState = {
  loading: false,
  isAuthenticated: false,
  token: null,
  rolId: null,
  permissions: [], // <--- Agregado
};

// Thunk para inicializar usuario desde el token guardado
export const initializeUser = createAsyncThunk(
  "auth/initializeUser",
  async (token, { dispatch }) => {
    try {
      dispatch(setLoading(true));

      if (!token || token === "null") {
        dispatch(logoutUser());
        dispatch(setLoading(false));
        return;
      }

      const rolId = await getUserRolId();
      const userId = getUserIdFromToken();
      const permissions = await getUserPermissions(userId);

      if (!rolId || !permissions) {
        dispatch(logoutUser());
        dispatch(setLoading(false));
        return;
      }

      dispatch(setUser({ token, rolId, permissions }));
      dispatch(setLoading(false));
    } catch (error) {
      console.error("[initializeUser] Error:", error);
      dispatch(logoutUser());
      dispatch(setLoading(false));
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
      if (!action.payload) {
        state.token = null;
      }
      state.loading = false;
    },

    setUser: (state, action) => {
      const { token, rolId, permissions = [] } = action.payload;

      if (token && token !== "null") {
        console.log("[setUser] Valid token, saving state...");
        state.token = token;
        state.rolId = rolId || null;
        state.permissions = permissions;
        state.isAuthenticated = true;

        localStorage.setItem("token", token);
        localStorage.setItem("rolId", rolId);
        localStorage.setItem("permissions", JSON.stringify(permissions)); // <--- Guardar en localStorage
        console.log("[setUser] State saved successfully");
      } else {
        console.warn("[setUser] Invalid or null token, clearing state...");
        state.token = null;
        state.rolId = null;
        state.permissions = [];
        state.isAuthenticated = false;
        
        localStorage.removeItem("token");
        localStorage.removeItem("rolId");
        localStorage.removeItem("permissions"); // <--- Limpiar
      }

      state.loading = false;
    },

    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.rolId = null;
      state.loading = false;
      localStorage.removeItem("token");
      localStorage.removeItem("rolId");
      localStorage.removeItem("permissions"); // <--- Limpiar
    },
  },
});

export const { setLoading, setUser, logoutUser, setAuthenticated } = authSlice.actions;
export default authSlice.reducer;
