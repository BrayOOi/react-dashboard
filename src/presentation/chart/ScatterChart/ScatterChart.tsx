import React from 'react';
import { CartesianGrid, Legend, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis } from 'recharts';

import dataA from './mock-data-1';
import dataB from './mock-data-2';

import { BaseChartProps } from '../types';

const MyScatterChart: React.FC<BaseChartProps> = ({
  width,
  height,
  xLegend,
  yLegend,
  tooltip,
  style
}) => (
  <ScatterChart width={width} height={height}
    margin={{
      top: 10,
      right: yLegend ? 20 : 10,
      bottom: xLegend ? 10 : -20,
      left: yLegend ? 10 : -40,
    }}
    style={style}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="x" name="stature" unit="cm" tick={xLegend} />
    <YAxis dataKey="y" name="weight" unit="kg" tick={yLegend} />
    <ZAxis dataKey="z" range={[64, 144]} name="score" unit="km" />
    {tooltip !== false && <Tooltip cursor={{ strokeDasharray: '3 3' }} />}
    {xLegend && <Legend />}
    <Scatter name="A school" data={dataA} fill="#8884d8" />
    <Scatter name="B school" data={dataB} fill="#82ca9d" />
  </ScatterChart>
  );

export default MyScatterChart;
