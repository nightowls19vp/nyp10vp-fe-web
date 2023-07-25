import { createSlice } from "@reduxjs/toolkit";

const homeSlide = createSlice({
  name: "home",
  initialState: {
    homeGroup: [],
    homeTodos: [],
    homeChat: [],
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
  },
});

export const {
    updateHomeGroups,
    updateHomeChats,
    updateHomeTodos,
} = homeSlide.actions;

export default homeSlide.reducer;
