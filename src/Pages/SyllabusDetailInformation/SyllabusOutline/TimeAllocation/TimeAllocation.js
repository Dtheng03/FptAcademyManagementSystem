import React, { useMemo } from "react";
import * as d3 from "d3";
import classNames from "classnames/bind";
import style from "./TimeAllocation.module.scss";

const cx = classNames.bind(style);

  const MARGIN = 30;

  export const TimeAllocation = ({ width, height, data }) => {
    const radius = Math.min(width, height) / 2 - MARGIN;

    const pie = useMemo(() => {
      const pieGenerator = d3.pie().value((d) => d.percent);
      return pieGenerator(data);
    }, [data]);

    const arcs = useMemo(() => {  
      const arcPathGenerator = d3.arc();
      return pie.map((p) =>
        arcPathGenerator({
          innerRadius: 0,
        outerRadius: radius,
        startAngle: p.startAngle,
        endAngle: p.endAngle,
      })
    );
  }, [radius, pie]);

  return (
    <svg width={width} height={height} style={{ display: "inline-block" }}>
      <g transform={`translate(${width / 2}, ${height / 2})`} >
        {arcs.map((arc, i) => {
          return <path key={i} d={arc} fill={data[i].color} />;
        })}
      </g>
    </svg>
  );
};
