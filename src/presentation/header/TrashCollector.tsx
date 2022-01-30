import React from 'react';
import { useDrop } from 'react-dnd';
import useAppDispatch from '../../app/hooks/useAppDispatch';

import HeaderAction from './HeaderAction';

import { discardChart } from '../../features/Dashboard/baseDashboardSlice';

import { LIGHT_GREEN } from '../../constants/colors';
import ITEM_TYPES from '../../constants/dnd';

import { ChartType } from '../chart/Chart';

const TrashCollector: React.FC = () => {
  const dispatch = useAppDispatch();
  const [{ canDrop }, drop] = useDrop(
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
    <div
      ref={drop}
      style={{
        backgroundColor: canDrop ? 'rgba(210, 237, 197, 0.5)' : undefined,
        boxShadow: canDrop ? `0px 0px 20px 5px ${LIGHT_GREEN}` : undefined
      }}
      >
      <HeaderAction>🗑️</HeaderAction>
    </div>
  );
};

export default TrashCollector;
