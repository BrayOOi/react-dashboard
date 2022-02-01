import React from 'react';
import { Resizable } from 'react-resizable';
import { useDrag } from 'react-dnd';
import { useAppDispatch } from '../../app/hooks';

import Chart, { ChartType } from './Chart';

import { resizeChart } from '../../features/Dashboard/baseDashboardSlice';
import {
  calculateContainerHeight,
  calculateContainerWidth
} from './utils';

import ITEM_TYPES from '../../constants/dnd';
import {
  DEFAULT_CHART_HEIGHT,
  DEFAULT_CHART_MARGIN,
  DEFAULT_CHART_WIDTH,
  DEFAULT_DASHBOARD_HEIGHT_UNIT,
  DEFAULT_DASHBOARD_WIDTH_UNIT
} from '../../constants/constants';

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
  const dispatch = useAppDispatch();
  
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ITEM_TYPES.CHART,
    item: chart,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }));

  const containerWidth = calculateContainerWidth(chart.columns[1] - chart.columns[0]);
  const containerHeight = calculateContainerHeight(chart.rows[1] - chart.rows[0]);

  if (!isDragging) {
    return (
      <div
        style={{
          gridColumnStart: columnStart,
          gridColumnEnd: columnEnd,
          gridRowStart: rowStart,
          gridRowEnd: rowEnd,
        }}>
        <Resizable
          className={styles.box}
          height={containerHeight}
          width={containerWidth}
          minConstraints={[
            DEFAULT_CHART_WIDTH,
            DEFAULT_CHART_HEIGHT
          ]}
          draggableOpts={{
            grid: [
              DEFAULT_CHART_WIDTH + DEFAULT_CHART_MARGIN,
              DEFAULT_CHART_HEIGHT + DEFAULT_CHART_MARGIN
            ]
          }}
          maxConstraints={[
            calculateContainerWidth(DEFAULT_DASHBOARD_WIDTH_UNIT),
            calculateContainerHeight(DEFAULT_DASHBOARD_HEIGHT_UNIT)
          ]}
          onResize={(event, {size, handle}) => {
            dispatch(resizeChart({
              delta: {
                width: size.width - containerWidth,
                height: size.height - containerHeight
              },
              targetChartId: chart.id,
              handle
            }));
          }}
          // @ts-ignore
          handle={(h, ref) => (
            <span
              className={
                `${styles["custom-handle"]} ${styles["custom-handle-" + h]}`}
              ref={ref}
            />
          )}
          handleSize={[8, 8]}
          resizeHandles={['sw', 'se', 'nw', 'ne', 'w', 'e', 'n', 's']}
        >
          <div
            style={{
              width: containerWidth,
              height: containerHeight,
            }}
            >
            <div ref={drag}>
              <Chart {...chart} />
            </div>
          </div>
          </Resizable>
      </div>
    );
  } else {
    return null;
  }
};

export default ChartContainer;
