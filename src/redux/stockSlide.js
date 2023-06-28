import { createSlice } from "@reduxjs/toolkit";

const stockSlide = createSlice({
  name: "stock",
  initialState: {
    listStock: [],
    listProduct: {
      items: null,
      meta: null,
    },
    groupProducts: {
      items: null,
      meta: null,
    },
  },
  reducers: {
    updateListStock: (state, action) => {
      state.listStock = action.payload;
    },
    updateItemsListProduct: (state, action) => {
      state.listProduct.items = action.payload;
    },
    updateMetaListProduct: (state, action) => {
      state.listProduct.meta = action.payload;
    },
    updateItemsGroupProducts: (state, action) => {
      state.groupProducts.items = action.payload;
    },
    updateMetaGroupProducts: (state, action) => {
      state.groupProducts.meta = action.payload;
    },
  },
});

export const {
  updateListStock,
  updateItemsListProduct,
  updateMetaListProduct,
  updateItemsGroupProducts,
  updateMetaGroupProducts,
} = stockSlide.actions;

export default stockSlide.reducer;
