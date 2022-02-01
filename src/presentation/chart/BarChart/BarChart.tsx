import React from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';

import { DEFAULT_CHART_HEIGHT } from '../../../constants/constants';
import data from './mock-data';

import { BaseChartProps } from '../types';

const MyBarChart: React.FC<BaseChartProps> = ({
  width,
  height
}) => (
  <BarChart width={width} height={height} data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    {height > (DEFAULT_CHART_HEIGHT * 1) && <Legend />}
    <Bar dataKey="pv" fill="#8884d8" />
    <Bar dataKey="uv" fill="#82ca9d" />
  </BarChart>
);

export default MyBarChart;