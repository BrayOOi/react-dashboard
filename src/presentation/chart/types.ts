export type ChartType = {
  id: string;
  columns: [number, number];
  rows: [number, number];
  type: 'area' | 'bar' | 'line' | 'pie' | 'scatter'
};

export type BaseChartProps = {
  width: number;
  height: number;
  xLegend: boolean;
  yLegend: boolean;
  tooltip?: boolean;
}

export type ChartProps = {
  type: ChartType['type'];
} & BaseChartProps;
