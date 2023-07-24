import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    flag: false,
    status: false,
    msg: "",
  },
  reducers: {
    updateOpenSnackbar: (state, action) => {
      state.flag = action.payload;
    },
    updateStatus: (state, action) => {
      state.status = action.payload;
    },
    updateMessage: (state, action) => {
      state.msg = action.payload;
    },
  },
});

export const { updateOpenSnackbar, updateStatus, updateMessage } =
  messageSlice.actions;

export default messageSlice.reducer;
