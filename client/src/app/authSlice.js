import { createSlice } from "@reduxjs/toolkit"; 
const initialState = {
  status: false,
  userData: null,
  userHealthData: null,
  darkMode: null, // null = not set, true = dark, false = light
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
      state.userHealthData = action.payload.userHealthData;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
      state.userHealthData = null;
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});
export const { login, logout, setDarkMode, toggleDarkMode } = authSlice.actions;
export default authSlice.reducer;