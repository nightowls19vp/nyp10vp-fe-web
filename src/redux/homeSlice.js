import { createSlice } from "@reduxjs/toolkit";

const homeSlide = createSlice({
  name: "home",
  initialState: {
    homeGroup: [],
    homeTodos: [],
    homeChat: [],
    homeBilling: [],
  },
  reducers: {
    updateHomeGroups: (state, action) => {
        state.homeGroup = action.payload;
    },
    updateHomeChats: (state, action) => {
        state.homeChat = action.payload;
    },
    updateHomeTodos: (state, action) => {
        state.homeTodos = action.payload;
    },
    updateHomeBilling: (state, action) => {
      state.homeBilling = action.payload;
    },
  },
});

export const {
    updateHomeGroups,
    updateHomeChats,
    updateHomeTodos,
    updateHomeBilling,
} = homeSlide.actions;

export default homeSlide.reducer;
