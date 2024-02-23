import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import './PipeChart.scss'; 

const PipeChart = ({ assignment, concept, guide, test, exam }) => {
  const data = [
    { name: 'Assignment/Lab', value: assignment, color: '#F4BE37' },
    { name: 'Concept/Lecture', value: concept, color: '#FF9F40' },
    { name: 'Guide/Review', value: guide, color: '#0D2535' },
    { name: 'Test/Quiz', value: test, color: '#5388D8' },
    { name: 'Exam', value: exam, color: '#206EE5' },
  ];

  const COLORS = data.map(entry => entry.color);

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    // return (
    //   // <>
    //   //   <circle className="legend-circle" cx={x - 60} cy={y} r={10} fill={COLORS[index]} />
    //   //   <text x={x - 45} y={y + 5} fill="white" textAnchor="start" dominantBaseline="central">
    //   //     {`${data[index].name}: ${(percent * 100).toFixed(2)}%`}
    //   //   </text>
    //   // </>
    // );
  };

  return (
    <div className="pipe-chart-container">
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          dataKey="value"
          cx={200}
          cy={200}
          labelLine={false}
          label
          outerRadius={80}
          fill="#8884d8"
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
