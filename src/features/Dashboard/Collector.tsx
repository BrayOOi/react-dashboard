// This is an element that will colleect any dropped 'chart' item
import React from 'react';
import { useDrop } from 'react-dnd';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { addChart, moveChart } from './baseDashboardSlice';
import { adjustCoords, calculateNewCoords, canDropChart } from './utils';

import { DEFAULT_CHART_HEIGHT, DEFAULT_CHART_WIDTH } from '../../constants/constants';
import { LIGHT_GREEN } from '../../constants/colors';
import ITEM_TYPES from '../../constants/dnd';

import { ChartType } from '../../presentation/chart/types';

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
      drop: (_item: ChartType | Omit<ChartType, 'id'>) => {
        if ('id' in _item) {
          // move operation
          dispatch(moveChart({
            targetId: _item.id,
            effectiveCoords,
            interactedCoords: [row, column]
          }));
        } else {
          // add operation
          dispatch(addChart({
            columns: calculateNewCoords(column, _item.columns),
            rows: calculateNewCoords(row, _item.rows),
            type: _item.type
          }));
        }
      },
      canDrop: (_item: ChartType | Omit<ChartType, 'id'>) => {
        if ('id' in _item) {
          // move operation
          const item = chartMap[_item.id];

          return canDropChart(
            calculateNewCoords(adjustCoords(row, item.rows[0], effectiveCoords[0]), item.rows),
            calculateNewCoords(adjustCoords(column, item.columns[0], effectiveCoords[1]), item.columns),
            Object.values(chartMap),
            item,
          );
        } else {
          return canDropChart(
            calculateNewCoords(row, _item.rows),
            calculateNewCoords(column, _item.columns),
            Object.values(chartMap)
          );
        }
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
      }} />
  );
};

export default Collector;
