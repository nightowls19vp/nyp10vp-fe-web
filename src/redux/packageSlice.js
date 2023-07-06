import { createSlice } from "@reduxjs/toolkit";

const packageSlice = createSlice({
  name: "package",
  initialState: {
    showSidebar: false,
    profileID: 1,
    package: [],
    numberCart: 0,
    cart: [],
    flagCart: 0,
    noti: null,
    bill: [],
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
    updateNotiCheckout: (state, action) => {
      state.flagCart = action.payload;
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
    updateNotiPackage: (state, action) => {
      state.noti = action.payload;
    },
    updateBill: (state, action) => {
      state.bill = action.payload;
    },
  },
});

export const {
  setInitialPackage,
  setCarts,
  updateNumberCart,
  updateNotiCheckout,
  toggleShowSidebar,
  updateShowSidebar,
  updateProfileId,
  updateNotiPackage,
  updateBill,
} = packageSlice.actions;

export default packageSlice.reducer;
