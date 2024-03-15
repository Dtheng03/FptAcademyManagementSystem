import React from "react";
import "./TimeAllocation.scss";
import { useSelector } from "react-redux";
import PipeChart from "../PipeChart/PipeChart";
import ChartLabel from "../PipeChart/ChartLabel";

const TimeAllocation = ({ width, height, outerRadius }) => {
  const outline = useSelector((state) => state.outline);

  const totalSyllabusTime = outline.reduce((total, day) => {
    day.units.forEach((unit) => {
      unit.syllabus.forEach((syllabus) => {
        const syllabusTime = parseInt(syllabus.time, 10) || 0;
        total += syllabusTime;
      });
    });
    return total;
  }, 0);

  const calculatePercentage = (type) => {
    let typeTotal = 0;
    outline.forEach((day) => {
      day.units.forEach((unit) => {
        unit.syllabus.forEach((syllabus) => {
          if (syllabus.type === type) {
            const syllabusTime = parseInt(syllabus.time, 10) || 0;
            typeTotal += syllabusTime;
          }
        });
      });
    });

    return (typeTotal / totalSyllabusTime) * 100;
  };

  const assignment = calculatePercentage("Assignment/Lab");
  const lecture = calculatePercentage("Concept/Lecture");
  const review = calculatePercentage("Guide/Review");
  const quiz = calculatePercentage("Test/Quiz");
  const exam = calculatePercentage("Exam");

  return (
    <div className="timeAllocationContainer" style={{ display: "flex", flexDirection: "column" }}>
      <div className="timeAllocationHeader subtitle1">Time Allocation</div>
      <div className="timeAllocationContent">
        <div className="timeAllocationPie">
          <PipeChart
            assignment={assignment}
            lecture={lecture}
            review={review}
            quiz={quiz}
            exam={exam}
            width={width}
            height={height}
            outerRadius={outerRadius}
          />
          <ChartLabel />
        </div>
      </div>
    </div>
  );
};

export default TimeAllocation;
