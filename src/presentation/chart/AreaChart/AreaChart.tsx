import React from 'react';
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

import data from './mock-data';

import { BaseChartProps } from '../types';

const MyAreaChart: React.FC<BaseChartProps> = ({
  width,
  height,
  xLegend,
  yLegend,
  tooltip,
  style
}) => (
  <AreaChart width={width} height={height} data={data}
    margin={{
      top: 5,
      right: yLegend ? 30 : 10,
      bottom: xLegend ? 0 : -20,
      left: yLegend ? 0 : -40,
    }}
    style={style}>
    <defs>
      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
      </linearGradient>
      <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
      </linearGradient>
    </defs>
    <XAxis dataKey="name" tick={xLegend} />
    <YAxis tick={yLegend} />
    <CartesianGrid strokeDasharray="3 3" />
    {tooltip !== false && <Tooltip />}
    <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
    <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
  </AreaChart>
);

export default MyAreaChart;
