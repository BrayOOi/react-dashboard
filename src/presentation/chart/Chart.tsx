import React from 'react';

import AreaChart from './AreaChart/AreaChart';
import BarChart from './BarChart/BarChart';
import LineChart from './LineChart/LineChart';
import PieChart from './PieChart/PieChart';
import ScatterChart from './ScatterChart/ScatterChart';

import {
  calculateChartHeight,
  calculateChartWidth
} from './utils';

export type ChartType = {
  id: string;
  columns: [number, number];
  rows: [number, number];
  type: 'area' | 'bar' | 'line' | 'pie' | 'scatter'
}

export type ChartProps = {
  width: number;
  height: number;
}

const Chart: React.FC<ChartType> = ({
  columns,
  rows,
  type
}) => {
  const width = calculateChartWidth(columns[1] - columns[0]);
  const height = calculateChartHeight(rows[1] - rows[0]);

  switch (type) {
    case 'area':
      return (
        <AreaChart width={width} height={height} />
      );
    case 'bar':
      return (
        <BarChart width={width} height={height} />
      );
    case 'line':
      return (
        <LineChart width={width} height={height} />
      );
    case 'pie':
      return (
        <PieChart width={width} height={height} />
      );
    case 'scatter':
      return (
        <ScatterChart width={width} height={height} />
      );
  }
};

export default Chart;
