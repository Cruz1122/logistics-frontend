import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  isAuthenticated: false,
  token: null,
};

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
      const { token } = action.payload;
    
      if (token && token !== "null") {
        console.log("[setUser] Token válido, guardando estado...");
        state.token = token;
        state.isAuthenticated = true;
        localStorage.setItem("token", token); // Guarda el token en localStorage
        console.log("[setUser] Estado guardado Exitosamente");
      } else {
        console.warn("[setUser] Token inválido o nulo, limpiando estado...");
        state.token = null;
        state.isAuthenticated = false;
        localStorage.removeItem("token"); // Elimina el token de localStorage
      }
    
      state.loading = false;
    },
    

    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.loading = false;
      localStorage.removeItem("token"); // Elimina el token al cerrar sesión
    },
  },
});

export const { setLoading, setUser, logoutUser, setAuthenticated } = authSlice.actions;
export default authSlice.reducer;
