import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
    name: "sidebar",
    initialState: {
        showSidebar: false,
        stockID: 1,
        profileID: 1,
    }, 
    reducers: {
        updateShowSidebar: (state, action) => {
            state.showSidebar = action.payload;
        },
        toggleShowSidebar: (state) => {
            state.showSidebar =!state.showSidebar;
        },
        updateStockId: (state, action) => {
            state.stockID = action.payload;
        },
        updateProfileId: (state, action) => {
            state.profileID = action.payload;
        },
    }
});

export const {
    toggleShowSidebar,
    updateShowSidebar,
    updateStockId,
    updateProfileId,
} = sidebarSlice.actions;

export default sidebarSlice.reducer;