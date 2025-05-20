import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserRolId } from "../api/auth"; // Ajusta la ruta si es necesario

const initialState = {
  loading: false,
  isAuthenticated: false,
  token: null,
  rolId: null,
};

// Thunk para inicializar usuario desde el token guardado
export const initializeUser = createAsyncThunk(
  "auth/initializeUser",
  async (token, { dispatch }) => {
    try {
      dispatch(setLoading(true));

      if (!token || token === "null") {
        dispatch(logoutUser());
        return;
      }

      const rolId = await getUserRolId();

      if (!rolId) {
        dispatch(logoutUser());
        return;
      }

      dispatch(setUser({ token, rolId }));
    } catch (error) {
      console.error("[initializeUser] Error:", error);
      dispatch(logoutUser());
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
      const { token, rolId } = action.payload;

      if (token && token !== "null") {
        console.log("[setUser] Token válido, guardando estado...");
        state.token = token;
        state.rolId = rolId || null;
        state.isAuthenticated = true;

        localStorage.setItem("token", token);
        localStorage.setItem("rolId", rolId);
        console.log("[setUser] Estado guardado exitosamente");
      } else {
        console.warn("[setUser] Token inválido o nulo, limpiando estado...");
        state.token = null;
        state.rolId = null;
        state.isAuthenticated = false;
        localStorage.removeItem("token");
        localStorage.removeItem("rolId");
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
    },
  },
});

export const { setLoading, setUser, logoutUser, setAuthenticated } = authSlice.actions;
export default authSlice.reducer;
