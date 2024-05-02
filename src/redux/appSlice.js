import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentScreen: "Home",
  badge: 0,
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
  },
});

export const { setCurrentScreen, setBadge } = homeSlice.actions;

export default homeSlice.reducer;
