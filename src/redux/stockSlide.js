import { createSlice } from "@reduxjs/toolkit";

const stockSlide = createSlice({
  name: "stock",
  initialState: {
    listStock: null,
    sidebarStock: null,
    idStock: 0,
    listProduct: {
      data: null,
      meta: null,
    },
  },
  reducers: {
    updateListStock: (state, action) => {
      state.listStock = action.payload;
    },
    updateSidebarStock: (state, action) => {
      state.sidebarStock = action.payload;
    },
    setIdOfStock: (state, action) => {
      state.idStock = action.payload;
    },
    updateListProduct: (state, action) => {
      state.listProduct.data = action.payload;
    },
    updateMetaListProduct: (state, action) => {
      state.listProduct.meta = action.payload;
    }
  },
});

export const {
  updateListStock,
  updateSidebarStock,
  setIdOfStock,
  updateListProduct,
  updateMetaListProduct
} = stockSlide.actions;

export default stockSlide.reducer;
