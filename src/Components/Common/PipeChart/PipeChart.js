import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import "./PipeChart.scss";

const PipeChart = ({ assignment, lecture, review, quiz, exam, width, height, outerRadius }) => {
  const data = [
    { name: "Assignment/Lab", value: assignment, color: "#F4BE37" },
    { name: "Concept/Lecture", value: lecture, color: "#FF9F40" },
    { name: "Guide/Review", value: review, color: "#0D2535" },
    { name: "Test/Quiz", value: quiz, color: "#5388D8" },
    { name: "Exam", value: exam, color: "#206EE5" },
  ];


  // const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  //   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  //   const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
  //   const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

  // return (
  //   // <>
  //   //   <circle className="legend-circle" cx={x - 60} cy={y} r={10} fill={COLORS[index]} />
  //   //   <text x={x - 45} y={y + 5} fill="white" textAnchor="start" dominantBaseline="central">
  //   //     {`${data[index].name}: ${(percent * 100).toFixed(2)}%`}
  //   //   </text>
  //   // </>
  // );
  // };
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    if (percent <= 0) return null;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  

  return (
    <div className="pipe-chart-container">
      <PieChart width={width} height={height}>
        <Pie
          data={data}
          dataKey="value"
          cx="50%"
          cy="45%"
          labelLine={false}
          outerRadius={outerRadius}
          fill="#8884d8"
          label={renderCustomizedLabel}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default PipeChart;
