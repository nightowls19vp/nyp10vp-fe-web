import { createSlice } from "@reduxjs/toolkit";

import PersonalInformation from "../features/Profile/PersonalInformation";

const sidebarSlice = createSlice({
    name: "sidebar",
    initialState: {
        stockID: 1,
        // stockItem: null,
        // profileID: 1,
        // profileItem:<PersonalInformation />,
        profile: {
            id: 1,
            name: <PersonalInformation />,
        }
    }, 
    reducers: {
        updateStockId: (state, action) => {
            state.stockID = action.payload;
        },
        // updateProfileId: (state, action) => {
        //     state.profileID = action.payload;
        //     // state.profileItem = action.payload.name;
        // },
        updateProfileId: (state, action) => {
            state.profile = action.payload;
        }
    }
});

export const {
    updateStockId,
    updateProfileId,
} = sidebarSlice.actions;

export default sidebarSlice.reducer;