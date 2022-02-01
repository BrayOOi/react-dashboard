import React, { useEffect } from 'react';
import { useDrag } from 'react-dnd';

import Chart from '../chart/Chart';

import ITEM_TYPES from '../../constants/dnd';

import { ChartType } from '../chart/types';

type ChartModalItemType = {
  type: ChartType["type"];
  row: number;
  column: number;
  toggleModalOff: () => void;
}

const ChartModalItem: React.FC<ChartModalItemType> = ({
  type,
  row,
  column,
  toggleModalOff
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ITEM_TYPES.CHART,
    item: {
      columns: [1, 1 + column],
      rows: [1, 1 + row],
      type,
    } as Omit<ChartType, 'id'>,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }));

  useEffect(() => {
    if (isDragging) {
      toggleModalOff();
    }
  }, [isDragging]);

  return (
    <div ref={drag} style={{
      width: 120,
      cursor: isDragging ? 'grabbing' : 'grab'
    }}>
      <Chart
        width={120}
        height={100}
        xLegend={false}
        yLegend={false}
        tooltip={false}
        type={type}
      />
    </div>
  );
};

export default ChartModalItem;
