// This is an element that will colleect any dropped 'chart' item
import React from 'react';
import { useDrop } from 'react-dnd';
import { useAppDispatch } from '../../app/hooks';
import { DEFAULT_CHART_HEIGHT, DEFAULT_CHART_WIDTH } from '../../constants/constants';
import ITEM_TYPES from '../../constants/dnd';
import { ChartType } from '../../presentation/chart/Chart';
import { moveChart } from './baseDashboardSlice';

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
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ITEM_TYPES.CHART,
      drop: (item: ChartType) => dispatch(moveChart({
        targetId: item.id,
        newCoords: {
          columns: [column, column+1],
          rows: [row, row+1]
        }
      })),
      canDrop: () => !isOccupied,
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      })
    }),
    []
  );

  return (
    <div
      ref={drop}
      style={{
        width: DEFAULT_CHART_WIDTH,
        height: DEFAULT_CHART_HEIGHT,
        gridColumnStart: column,
        gridRowStart: row,
        backgroundColor: canDrop ? 'green' : 'white'
      }} />
  );
};

export default Collector;
