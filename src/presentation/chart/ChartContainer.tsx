import React from 'react';
import { useDrag } from 'react-dnd';

import Chart, { ChartType } from './Chart';

import ITEM_TYPES from '../../constants/dnd';
import { DEFAULT_CHART_PADDING } from '../../constants/constants';

import styles from './Chart.module.css';

interface ChartContainerProps {
  columnStart: number;
  columnEnd: number;
  rowStart: number;
  rowEnd: number;

  chart: ChartType;
}

const ChartContainer: React.FC<ChartContainerProps> = ({
  columnStart,
  columnEnd,
  rowStart,
  rowEnd,

  chart
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ITEM_TYPES.CHART,
    item: chart,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }));

  return (
    <div
      ref={drag}
      className={styles.chart}
      style={{
        padding: DEFAULT_CHART_PADDING,
        gridColumnStart: columnStart,
        gridColumnEnd: columnEnd,
        gridRowStart: rowStart,
        gridRowEnd: rowEnd,
      }}>
      {!isDragging && (
        <Chart {...chart} />
      )}
    </div>
  );
};

export default ChartContainer;