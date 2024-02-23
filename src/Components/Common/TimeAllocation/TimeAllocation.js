import React from "react";
import "./TimeAllocation.scss";
import PipeChart from "../PipeChart/PipeChart";

const TimeAllocation = () => {
  const assignment = 40;
  const concept = 20;
  const guide = 10;
  const test = 15;
  const exam = 15;
  return (
    <div
      className="timeAllocationContainer"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div className="timeAllocationHeader">Time Allocation</div>
      <div className="timeAllocationContent">
        <div className="timeAllocationPie">
          <PipeChart
            assignment={assignment}
            concept={concept}
            guide={guide}
            test={test}
            exam={exam}
          />
        </div>
      </div>
    </div>
  );
};

export default TimeAllocation;
