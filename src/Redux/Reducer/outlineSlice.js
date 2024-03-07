import { createSlice } from "@reduxjs/toolkit";

const outlineSlice = createSlice({
  name: "outline",
  initialState: [],
  reducers: {
    addDay: (state, action) => {
      state.push(action.payload);
    },
    addUnit: (state, action) => {
      const { dayIndex, unit } = action.payload;
      state[dayIndex].units.push(unit);
    },
    addSyllabus: (state, action) => {
      const { dayIndex, unitIndex, syllabus } = action.payload;
      state[dayIndex].units[unitIndex].syllabus.push(syllabus);
    },
  },
});

export const { addDay, addUnit, addSyllabus } = outlineSlice.actions;
export default outlineSlice.reducer;
