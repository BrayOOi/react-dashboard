import React from 'react';
import { Pie, PieChart } from 'recharts';

import data from './mock-data';

import { BaseChartProps } from '../types';

const MyPieChart: React.FC<BaseChartProps> = ({
  width,
  height,
  style
}) => (
  <PieChart
    width={width}
    height={height}
    style={style}>
    <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={height * 0.4} fill="#8884d8" />
  </PieChart>
);

export default MyPieChart;
