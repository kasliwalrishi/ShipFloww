import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    currentAdmin: null,
    isFetching: false,
    error: false,
    errorMessage: "",
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
      state.error = false;
      state.errorMessage = "";
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentAdmin = action.payload;
      state.error = false;
      state.errorMessage = "";
    },
    loginFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.errorMessage = action.payload || "Login failed";
    },
    logOut: (state) => {
      state.isFetching = false;
      state.currentAdmin = null;
      state.error = false;
      state.errorMessage = "";
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logOut } =
  adminSlice.actions;

export default adminSlice.reducer;
