import React from 'react';
import { useDrop } from 'react-dnd';
import useAppDispatch from '../../app/hooks/useAppDispatch';

import HeaderAction from './HeaderAction';

import ITEM_TYPES from '../../constants/dnd';
import { discardChart } from '../../features/Dashboard/baseDashboardSlice';
import { ChartType } from '../chart/Chart';

const TrashCollector: React.FC = () => {
  const dispatch = useAppDispatch();
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ITEM_TYPES.CHART,
      drop: (item: ChartType) => dispatch(discardChart(item.id)),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      })
    }),
    []
  );
  
  return (
    <div ref={drop}>
      <HeaderAction>🗑️</HeaderAction>
    </div>
  );
};

export default TrashCollector;
