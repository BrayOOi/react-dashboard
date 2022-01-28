import React, { useMemo } from 'react';
import useAppSelector from '../../app/hooks/useAppSelector';

import Collector from './Collector';
import ChartContainer from '../../presentation/chart/ChartContainer';

import {
  DEFAULT_CHART_HEIGHT,
  DEFAULT_CHART_PADDING,
  DEFAULT_CHART_WIDTH,
  DEFAULT_DASHBOARD_GAP,
  DEFAULT_DASHBOARD_HEIGHT_UNIT,
  DEFAULT_DASHBOARD_WIDTH_UNIT
} from '../../constants/constants';

import styles from './Dashboard.module.css';

const BaseDashboard: React.FC = () => {
  const dashboardState = useAppSelector(state => state.dashboard);

  return (
    <div
      className={styles.dashboard}
      style={{
        gridTemplateColumns: `repeat(${dashboardState.totalWidthUnit}, ${DEFAULT_CHART_WIDTH}px)`,
        gridTemplateRows: `repeat(${dashboardState.totalHeightUnit}, ${DEFAULT_CHART_HEIGHT}px)`,
        columnGap: DEFAULT_DASHBOARD_GAP,
        rowGap: DEFAULT_DASHBOARD_GAP,
        padding: DEFAULT_DASHBOARD_GAP
      }}
    >
      {Array(DEFAULT_DASHBOARD_HEIGHT_UNIT).fill(0).map((_, row) => (
        Array(DEFAULT_DASHBOARD_WIDTH_UNIT).fill(0).map((_, column) => (
          <Collector
            key={`${row},${column}`}
            column={column + 1}
            row={row + 1}
          />
        ))
      ))}

      {Object.values(dashboardState.data).map(chart => (
        <ChartContainer
          key={chart.id}
          columnStart={chart.columns[0]}
          columnEnd={chart.columns[1]}
          rowStart={chart.rows[0]}
          rowEnd={chart.rows[1]}

          chart={chart}
        />
      ))}
    </div>
  );
};

export default BaseDashboard;
