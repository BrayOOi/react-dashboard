// This is an element that will colleect any dropped 'chart' item
import React from 'react';
import { useDrop } from 'react-dnd';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { LIGHT_GREEN } from '../../constants/colors';
import { DEFAULT_CHART_HEIGHT, DEFAULT_CHART_WIDTH } from '../../constants/constants';
import ITEM_TYPES from '../../constants/dnd';
import { ChartType } from '../../presentation/chart/Chart';
import { moveChart } from './baseDashboardSlice';
import { calculateNewCoords, canDropChart } from './utils';

interface CollectorProps {
  column: number;
  row: number;
  isOccupied: boolean;
};

const Collector: React.FC<CollectorProps> = ({
  column,
  row,
  isOccupied,
}) => {
  const dispatch = useAppDispatch();
  const occupiedMap = useAppSelector(state => state.dashboard.occupiedMap);

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ITEM_TYPES.CHART,
      drop: (item: ChartType) => dispatch(moveChart({
        targetId: item.id,
        newCoords: {
          columns: calculateNewCoords(column, item.columns),
          rows: calculateNewCoords(row, item.rows),
        }
      })),
      canDrop: (item: ChartType) => 
        !isOccupied && canDropChart(row, column, item),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      })
    }),
    [isOccupied]
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
