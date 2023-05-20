import { createSlice } from "@reduxjs/toolkit";

const packageSlice = createSlice({
  name: "sidebar",
  initialState: {
    showSidebar: false,
    groupID: 0,
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
    setGroups: (state, action) => {
      state.groups = action.payload;
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
    updateGroupId: (state, action) => {
      state.groupID = action.payload;
    },
    updateProfileId: (state, action) => {
      state.profileID = action.payload;
    },
  },
});

export const {
  setInitialPackage,
  setCarts,
  setGroups,
  updateNumberCart,
  toggleShowSidebar,
  updateShowSidebar,
  updateGroupId,
  updateProfileId,
} = packageSlice.actions;

export default packageSlice.reducer;
