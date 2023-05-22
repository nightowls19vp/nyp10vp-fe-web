import { createSlice } from "@reduxjs/toolkit";

const packageSlice = createSlice({
  name: "sidebar",
  initialState: {
    showSidebar: false,
    groups: [],
    profileID: 1,
    package: [],
    numberCart: 0,
    cart: [],
  },
  reducers: {
    setInitialPackage: (state, action) => {
      state.package = action.payload;
    },
    setCarts: (state, action) => {
      state.cart = action.payload;
    },
    updateNumberCart: (state, action) => {
      state.numberCart = action.payload;
    },
    updateShowSidebar: (state, action) => {
      state.showSidebar = action.payload;
    },
    toggleShowSidebar: (state) => {
      state.showSidebar = !state.showSidebar;
    },
    updateProfileId: (state, action) => {
      state.profileID = action.payload;
    },
  },
});

export const {
  setInitialPackage,
  setCarts,
  updateNumberCart,
  toggleShowSidebar,
  updateShowSidebar,
  updateProfileId,
} = packageSlice.actions;

export default packageSlice.reducer;
