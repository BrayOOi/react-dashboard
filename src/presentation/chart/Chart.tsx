import React from 'react';

import AreaChart from './AreaChart/AreaChart';
import BarChart from './BarChart/BarChart';
import LineChart from './LineChart/LineChart';
import PieChart from './PieChart/PieChart';
import ScatterChart from './ScatterChart/ScatterChart';

import { ChartProps } from './types';

const Chart: React.FC<ChartProps> = ({
  width,
  height,
  type,
  xLegend,
  yLegend,
  tooltip = true,
}) => {
  switch (type) {
    case 'area':
      return (
        <AreaChart
          width={width}
          height={height}
          xLegend={xLegend}
          yLegend={yLegend}
          tooltip={tooltip}
        />
      );
    case 'bar':
      return (
        <BarChart
          width={width}
          height={height}
          xLegend={xLegend}
          yLegend={yLegend}
          tooltip={tooltip}
        />
      );
    case 'line':
      return (
        <LineChart
          width={width}
          height={height}
          xLegend={xLegend}
          yLegend={yLegend}
          tooltip={tooltip}
        />
      );
    case 'pie':
      return (
        <PieChart
          width={width}
          height={height}
          xLegend={xLegend}
          yLegend={yLegend}
          tooltip={tooltip}
        />
      );
    case 'scatter':
      return (
        <ScatterChart
          width={width}
          height={height}
          xLegend={xLegend}
          yLegend={yLegend}
          tooltip={tooltip}
        />
      );
  }
};

export default Chart;
