import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        userInfo: null,
        isFetching: false,
        error: false,
        mgsUser: null,
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
    }
});

export const {
   getUserInforStart,
   getUserInforSuccess,
   getUserInforFailed,
} = userSlice.actions;

export default userSlice.reducer;