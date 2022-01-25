import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

import { calculateHeight, calculateWidth } from './utils';

import styles from './Chart.module.css';

import mockData from './mock-data';

export type ChartType = {
  id: string;
  columns: [number, number];
  rows: [number, number];
  type: string; //TODO
}

const Chart: React.FC<ChartType> = ({
  columns,
  rows,
}) => {
  const width = calculateWidth(columns[1] - columns[0]);
  const height = calculateHeight(rows[1] - rows[0]);

  return (
    <LineChart
      height={height}
      width={width}
      data={mockData}
      style={{
        cursor: 'grab'
      }}
      margin={{
        top: 20,
      }}>
      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="name" />
      <YAxis />
    </LineChart>
  );
};

export default Chart;
