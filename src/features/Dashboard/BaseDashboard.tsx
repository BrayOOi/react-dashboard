import React, { useReducer } from 'react';
import Chart from '../../presentation/chart/Chart';
import baseDashboardReducer, { initialState } from './baseDashboardSlice';

import {
  DEFAULT_CHART_PADDING,
  DEFAULT_DASHBOARD_GAP
} from '../../constants/constants';

import styles from './Dashboard.module.css';

const BaseDashboard: React.FC = () => {
  const [dashboardState, localDispatch] = useReducer(baseDashboardReducer, initialState);

  return (
    <div
      className={styles.dashboard}
      style={{
        gridTemplateColumns: `repeat(${dashboardState.totalWidthUnit}, 200px)`,
        gridTemplateRows: `repeat(${dashboardState.totalHeightUnit}, 180px)`,
        columnGap: DEFAULT_DASHBOARD_GAP,
        rowGap: DEFAULT_DASHBOARD_GAP,
        padding: DEFAULT_DASHBOARD_GAP
      }}
    >
      {dashboardState.data.map(chart => (
        <div
          className={styles.chart}
          style={{
            padding: DEFAULT_CHART_PADDING,
            gridColumnStart: chart.columns[0],
            gridColumnEnd: chart.columns[1],
            gridRowStart: chart.rows[0],
            gridRowEnd: chart.rows[1]
          }}>

        </div>
      ))}
    </div>
  );
};

export default BaseDashboard;
