import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
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
        state.currentUser = null;
      }
      state.loading = false;
    },
    setUser: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.currentUser = action.payload.user;
      state.loading = false;
    },
    logoutUser: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.token = null;
      state.loading = false;
      localStorage.removeItem("token");
    },
  },
});

export const { setLoading, setUser, logoutUser, setAuthenticated } = authSlice.actions;
export default authSlice.reducer;
