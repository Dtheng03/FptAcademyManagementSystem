import { createSlice } from "@reduxjs/toolkit";

const outlineSlice = createSlice({
  name: "outline",
  initialState: [],
  reducers: {
    addDay: (state, action) => {
      const newDay = action.payload;
      state.push(newDay);

      state.forEach((day, index) => {
        day.dayNumber = index + 1;
      });
    },
    addUnit: (state, action) => {
      const { dayIndex, unit } = action.payload;
      state[dayIndex].units.push(unit);
    },
    addSyllabus: (state, action) => {
      const { dayIndex, unitIndex, syllabus } = action.payload;
      state[dayIndex].units[unitIndex].syllabus.push(syllabus);
    },
    removeDay: (state, action) => {
      const dayIndexToRemove = action.payload;
      state.splice(dayIndexToRemove, 1);

      state.forEach((day, index) => {
        day.dayNumber = index + 1;
      });
    },
    removeUnit: (state, action) => {
      const { dayIndex, unitIndex } = action.payload;
      state[dayIndex].units.splice(unitIndex, 1);
    },

  },
});

export const { addDay, addUnit, addSyllabus, removeDay, removeUnitx } = outlineSlice.actions;
export default outlineSlice.reducer;
