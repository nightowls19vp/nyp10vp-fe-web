import { createSlice } from "@reduxjs/toolkit";

const stockSlide = createSlice({
  name: "stock",
  initialState: {
    listStock: null,
    listProduct: {
      data: null,
      meta: null,
    },
  },
  reducers: {
    updateListStock: (state, action) => {
      state.listStock = action.payload;
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
  updateListProduct,
  updateMetaListProduct
} = stockSlide.actions;

export default stockSlide.reducer;
