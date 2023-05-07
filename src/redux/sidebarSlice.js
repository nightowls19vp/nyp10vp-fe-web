import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
    name: "sidebar",
    initialState: {
        showSidebar: false,
        packageID: 1,
        profileID: 1,
    }, 
    reducers: {
        updateShowSidebar: (state, action) => {
            state.showSidebar = action.payload;
        },
        toggleShowSidebar: (state) => {
            state.showSidebar =!state.showSidebar;
        },
        updatePackageId: (state, action) => {
            state.packageID = action.payload;
        },
        updateProfileId: (state, action) => {
            state.profileID = action.payload;
        },
    }
});

export const {
    toggleShowSidebar,
    updateShowSidebar,
    updatePackageId,
    updateProfileId,
} = sidebarSlice.actions;

export default sidebarSlice.reducer;