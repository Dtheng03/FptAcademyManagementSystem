import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        updateUser: {},
        classes: [],
    },
    reducers: {
        setUpdateUser: (state, action) => {
            state.updateUser = action.payload;
        },
    },
});

export const { setUpdateUser } = userSlice.actions;
export default userSlice.reducer;