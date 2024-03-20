import { createSlice } from '@reduxjs/toolkit';

const locationSlice = createSlice({
    name: 'location',
    initialState: {
        locationList: [],
    },
    reducers: {
        setLocationList: (state, action) => {
            state.locationList = action.payload;
        },
    },
});

export const { setLocationList } = locationSlice.actions;
export default locationSlice.reducer;