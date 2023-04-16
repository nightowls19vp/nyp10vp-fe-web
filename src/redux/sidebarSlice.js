import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
    name: "sidebar",
    initialState: {
        stockID: 1,
        profileID: 1,
        heightHeader: null,
        heightFooter: null,
    }, 
    reducers: {
        updateStockId: (state, action) => {
            state.stockID = action.payload;
        },
        updateProfileId: (state, action) => {
            state.profileID = action.payload;
        },
        updateHeightHeader: (state, action) => {
            state.heightHeader = action.payload;
        },
        updateHeightFooter: (state, action) => {
            state.heightFooter = action.payload;
        }
    }
});

export const {
    updateStockId,
    updateProfileId,
    updateHeightHeader,
    updateHeightFooter,
} = sidebarSlice.actions;

export default sidebarSlice.reducer;