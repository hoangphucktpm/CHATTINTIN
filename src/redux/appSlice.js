import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentScreen: "Home",
  badge: 0,
  isLoading: false,
};

export const homeSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCurrentScreen: (state, action) => {
      state.currentScreen = action.payload;
    },
    setBadge: (state, action) => {
      state.badge = action.payload;
    },
    setLoadingGlobals: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setCurrentScreen, setBadge, setLoadingGlobals } =
  homeSlice.actions;

export default homeSlice.reducer;
