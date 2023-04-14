import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
    name: "sidebar",
    initialState: {
        stockID: 1,
        profileID: 1,
    }, 
    reducers: {
        updateStockId: (state, action) => {
            state.stockID = action.payload;
        },
        updateProfileId: (state, action) => {
            state.profileID = action.payload;
        },
    }
});

export const {
    updateStockId,
    updateProfileId,
} = sidebarSlice.actions;

export default sidebarSlice.reducer;