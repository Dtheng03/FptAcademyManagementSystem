import {createSlice} from '@reduxjs/toolkit';

const ProgramSlice = createSlice({
    name: 'program',
    initialState :{
        programList: [],
    },
    reducers:{
        setProgramList:(state, action) =>{
            state.programList = action.payload;
        },
    },
});


export const{setProgramList} = ProgramSlice.actions;
export default ProgramSlice.reducer;