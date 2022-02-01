import React from 'react';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

import data from './mock-data';

import { BaseChartProps } from '../types';

const MyLineChart: React.FC<BaseChartProps> = ({
  width,
  height,
  xLegend,
  yLegend,
  tooltip,
  style
}) => (
  <LineChart width={width} height={height} data={data}
    margin={{
      top: 5,
      right: yLegend ? 30 : 10,
      bottom: xLegend ? 5 : -20,
      left: yLegend ? 20 : -40,
    }}
    style={style}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" tick={xLegend} />
    <YAxis tick={yLegend} />
    {tooltip !== false && <Tooltip />}
    {xLegend && <Legend />}
    <Line type="monotone" dataKey="pv" stroke="#8884d8" />
    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
  </LineChart>
);

export default MyLineChart;
