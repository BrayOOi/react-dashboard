import React from 'react';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

import { DEFAULT_CHART_HEIGHT } from '../../../constants/constants';
import data from './mock-data';

import { BaseChartProps } from '../types';

const MyLineChart: React.FC<BaseChartProps> = ({
  width,
  height
}) => (
  <LineChart width={width} height={height} data={data}
    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    {height > (DEFAULT_CHART_HEIGHT * 1) && <Legend />}
    <Line type="monotone" dataKey="pv" stroke="#8884d8" />
    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
  </LineChart>
);

export default MyLineChart;
