import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("accessToken");
    },
    initializeAuth(state) {
      const token = localStorage.getItem("accessToken");
      const user = JSON.parse(localStorage.getItem("user"));
      if (token && user) {
        state.isAuthenticated = true;
        state.user = user;
      }
    },
  },
});

export const { login, logout, initializeAuth } = authSlice.actions;
export default authSlice.reducer;
