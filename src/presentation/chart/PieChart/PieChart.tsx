import React from 'react';
import { Pie, PieChart } from 'recharts';

import data from './mock-data';

import { ChartProps } from '../Chart';

const MyPieChart: React.FC<ChartProps> = ({
  width,
  height
}) => (
  <PieChart width={width} height={height}>
    <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={height * 0.4} fill="#8884d8" />
  </PieChart>
);

export default MyPieChart;
