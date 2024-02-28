import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roleName: null,
};

export const RoleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    setRoleName(state, action) {
      state.roleName = action.payload;
    },
  },
});

export const { setRoleName } = RoleSlice.actions;

export default RoleSlice.reducer;
