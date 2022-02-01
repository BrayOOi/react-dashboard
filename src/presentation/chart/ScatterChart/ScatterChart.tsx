import React from 'react';
import { CartesianGrid, Legend, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis } from 'recharts';
import { ChartProps } from '../Chart';
import dataA from './mock-data-1';
import dataB from './mock-data-2';

const MyScatterChart: React.FC<ChartProps> = ({
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
    <Legend />
    <Scatter name="A school" data={dataA} fill="#8884d8" />
    <Scatter name="B school" data={dataB} fill="#82ca9d" />
  </ScatterChart>
  );

export default MyScatterChart;
