import useAppSelector from '../../app/hooks/useAppSelector';

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
          <Chart {...chart} />
        </div>
      ))}
    </div>
  );
};

export default BaseDashboard;
