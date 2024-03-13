import { createSlice } from "@reduxjs/toolkit";

const fileUploadSlice = createSlice({
  name: "fileUpload",
  initialState: [],
  reducers: {
    addUploadedFile: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addUploadedFile } = fileUploadSlice.actions;
export default fileUploadSlice.reducer;