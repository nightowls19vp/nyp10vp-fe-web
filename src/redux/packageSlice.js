import { createSlice } from "@reduxjs/toolkit";

const packageSlice = createSlice({
  name: "sidebar",
  initialState: {
    showSidebar: false,
    packageID: 1,
    profileID: 1,
    package: [],
  },
  reducers: {
    setInitialPackage: (state, action) => {
      state.package = action.payload;
    },
    updateShowSidebar: (state, action) => {
      state.showSidebar = action.payload;
    },
    toggleShowSidebar: (state) => {
      state.showSidebar = !state.showSidebar;
    },
    updatePackageId: (state, action) => {
      state.packageID = action.payload;
    },
    updateProfileId: (state, action) => {
      state.profileID = action.payload;
    },
  },
});

export const {
  setInitialPackage,
  toggleShowSidebar,
  updateShowSidebar,
  updatePackageId,
  updateProfileId,
} = packageSlice.actions;

export default packageSlice.reducer;
