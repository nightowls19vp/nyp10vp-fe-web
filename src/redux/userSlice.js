import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        userInfo: null,
        isFetching: false,
        error: false,
        mgsUser: null,
        groupAll: null,
        groupID: 0,
    }, 
    reducers: {
        getUserInforStart: (state) => {
            state.isFetching = true;
        },
        getUserInforSuccess: (state, action) => {
            state.userInfo = action.payload;
            state.isFetching = false;
            state.error = false;
        },
        getUserInforFailed: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        getGroupAll: (state, action) => {
            state.groupAll = action.payload;
        },
        updateGroupId: (state, action) => {
            state.groupID = action.payload;
        },
    }
});

export const {
   getUserInforStart,
   getUserInforSuccess,
   getUserInforFailed,
   getGroupAll,
   updateGroupId,
} = userSlice.actions;

export default userSlice.reducer;