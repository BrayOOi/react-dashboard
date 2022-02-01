import React from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';

import data from './mock-data';

import { BaseChartProps } from '../types';

const MyBarChart: React.FC<BaseChartProps> = ({
  width,
  height,
  xLegend,
  yLegend,
  tooltip
}) => (
  <BarChart
    width={width}
    height={height}
    data={data}
    margin={{
      top: 5,
      right: xLegend ? 20 : 10,
      bottom: xLegend ? 10 : -20,
      left: yLegend ? 10 : -40,
    }}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" tick={xLegend} />
    <YAxis tick={yLegend} />
    {tooltip !== false && <Tooltip />}
    {xLegend && <Legend />}
    <Bar dataKey="pv" fill="#8884d8" />
    <Bar dataKey="uv" fill="#82ca9d" />
  </BarChart>
);

export default MyBarChart;