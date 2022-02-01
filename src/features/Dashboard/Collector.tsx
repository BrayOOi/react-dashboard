// This is an element that will colleect any dropped 'chart' item
import React from 'react';
import { useDrop } from 'react-dnd';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { ChartType } from '../../presentation/chart/Chart';

import { moveChart } from './baseDashboardSlice';
import { adjustCoords, calculateNewCoords, canDropChart } from './utils';

import { DEFAULT_CHART_HEIGHT, DEFAULT_CHART_WIDTH } from '../../constants/constants';
import { LIGHT_GREEN } from '../../constants/colors';
import ITEM_TYPES from '../../constants/dnd';

interface CollectorProps {
  column: number;
  row: number;
  effectiveCoords: [number, number]; // this is the coords where the mouse is interacting with the chart
};

const Collector: React.FC<CollectorProps> = ({
  column,
  row,
  effectiveCoords,
}) => {
  const dispatch = useAppDispatch();
  const chartMap = useAppSelector(state => state.dashboard.data);

  const [{ canDrop }, drop] = useDrop(
    () => ({
      accept: ITEM_TYPES.CHART,
      drop: (staleItem: ChartType) => dispatch(moveChart({
        targetId: staleItem.id,
        effectiveCoords,
        interactedCoords: [row, column]
      })),
      canDrop: (staleItem: ChartType) => {
        const item = chartMap[staleItem.id];

        return canDropChart(
          calculateNewCoords(adjustCoords(row, item.rows[0], effectiveCoords[0]), item.rows),
          calculateNewCoords(adjustCoords(column, item.columns[0], effectiveCoords[1]), item.columns),
          item,
          Object.values(chartMap));
      },
      collect: (monitor) => ({
        canDrop: !!monitor.canDrop(),
      })
    }),
    [chartMap, effectiveCoords]
  );

  return (
    <div
      ref={drop}
      style={{
        width: DEFAULT_CHART_WIDTH,
        height: DEFAULT_CHART_HEIGHT,
        gridColumnStart: column,
        gridRowStart: row,
        backgroundColor: canDrop ? LIGHT_GREEN : 'white',
      }}>
        {row}, {column}<br />
        canDrop {canDrop ? 'true' : 'false'}<br />
    </div>
  );
};

export default Collector;
