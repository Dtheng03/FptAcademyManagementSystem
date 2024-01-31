// ProgressBar.jsx
import React, { useEffect, useState } from "react";
import { Circle } from "./Circle";
import "./ProgressBar.scss";

const ProgressBar = ({ progressStatus }) => {
  const [circle, setCircle] = useState(4);
  const [active, setActive] = useState(progressStatus);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth((100 / (circle - 1)) * active);
  }, [circle, active]);

  const getProgressColor = () => {
    switch (active) {
      case 0:
        return "#2D3748";
      case 1:
        return "#EDF2F7";
      case 2:
        return "#D45B13";
      case 3:
        return "#2F903F";
      default:
        return "#000000";
    }
  };

  const labels = ["General", "Outline", "Other", "Done"];

  const arr = [];
  for (let i = 0; i < circle; i++) {
    arr.push(
      <Circle
        key={i}
        className={i <= active ? `circle active` : "circle"}
        label={labels[i]}
        progressColor={i <= active ? getProgressColor() : ""}
      >
        {""}
      </Circle>
    );
  }

  return (
    <div className="progressBarContainer">
      <div className="progressBarContent">
        <div className="progressBar">
          <div
            className="progress"
            style={{ width: width + "%", backgroundColor: getProgressColor() }}
          ></div>
          {arr}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
