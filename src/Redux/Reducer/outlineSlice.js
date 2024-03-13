import { createSlice } from "@reduxjs/toolkit";

const calculateSyllabusTypePercentage = (state) => {
  const syllabusTypeTimes = {
    assignment: 0,
    lecture: 0,
    review: 0,
    quiz: 0,
    exam: 0,
  };

  state.forEach((day) => {
    day.units.forEach((unit) => {
      unit.syllabus.forEach((syllabus) => {
        const type = syllabus.type.toLowerCase();
        const time = parseInt(syllabus.time, 10) || 0;
        syllabusTypeTimes[type] += time;
      });
    });
  });

  const totalSyllabusTime = Object.values(syllabusTypeTimes).reduce(
    (total, time) => total + time,
    0
  );

  const percentageTimes = {};
  Object.entries(syllabusTypeTimes).forEach(([type, time]) => {
    const percentage = (time / totalSyllabusTime) * 100 || 0;
    percentageTimes[type] = percentage.toFixed(2);
  });

  return percentageTimes;
};

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
    updateUnitName: (state, action) => {
      const { dayIndex, unitIndex, newUnitName } = action.payload;
      state[dayIndex].units[unitIndex].unitName = newUnitName;
    },
    deleteUnit: (state, action) => {
      const { dayIndex, unitIndex } = action.payload;
      state[dayIndex].units.splice(unitIndex, 1);

      for (let i = unitIndex; i < state[dayIndex].units.length; i++) {
        state[dayIndex].units[i].unitNumber = i + 1;
      }
    },
    calculateAndDisplaySyllabusTypePercentage: (state) => {
      const percentageTimes = calculateSyllabusTypePercentage(state);
      console.log("Syllabus Type Percentage Times:", percentageTimes);
    },
  },
});

export const {
  addDay,
  addUnit,
  addSyllabus,
  removeDay,
  removeUnitx,
  updateUnitName,
  deleteUnit,
  calculateAndDisplaySyllabusTypePercentage,
} = outlineSlice.actions;
export default outlineSlice.reducer;
