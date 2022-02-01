import React from 'react';
import { CartesianGrid, Legend, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis } from 'recharts';

import { DEFAULT_CHART_HEIGHT } from '../../../constants/constants';
import dataA from './mock-data-1';
import dataB from './mock-data-2';

import { BaseChartProps } from '../types';

const MyScatterChart: React.FC<BaseChartProps> = ({
  width,
  height
}) => (
  <ScatterChart width={width} height={height}
    margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="x" name="stature" unit="cm" />
    <YAxis dataKey="y" name="weight" unit="kg" />
    <ZAxis dataKey="z" range={[64, 144]} name="score" unit="km" />
    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
    {height > (DEFAULT_CHART_HEIGHT * 1) && <Legend />}
    <Scatter name="A school" data={dataA} fill="#8884d8" />
    <Scatter name="B school" data={dataB} fill="#82ca9d" />
  </ScatterChart>
  );

export default MyScatterChart;
