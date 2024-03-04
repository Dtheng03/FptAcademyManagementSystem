import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        usersList: [],
        updateUser: {},
    },
    reducers: {
        setUsersList: (state, action) => {
            state.usersList = action.payload;
        },
        setUpdateUser: (state, action) => {
            state.updateUser = action.payload;
        },
    },
});

export const { setUsersList, setUpdateUser } = usersSlice.actions;
export default usersSlice.reducer;