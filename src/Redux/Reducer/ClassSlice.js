import { createSlice } from '@reduxjs/toolkit';

const classSlice = createSlice({
    name: 'class',
    initialState: {
        classList: [],
    },
    reducers: {
        setClassList: (state, action) => {
            state.classList = action.payload;
        },
    },
});


export const { setClassList } = classSlice.actions;
export default classSlice.reducer;