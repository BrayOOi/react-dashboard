import React from 'react';
import { Pie, PieChart } from 'recharts';
import { ChartProps } from '../Chart';
import data from './mock-data';

const MyPieChart: React.FC<ChartProps> = ({
  width,
  height
}) => (
  <PieChart width={width} height={height}>
    <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" />
  </PieChart>
);

export default MyPieChart;
