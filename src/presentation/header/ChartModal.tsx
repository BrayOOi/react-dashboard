import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import CHART_TEMPLATES from './chart-data';

import styles from './Header.module.css';

const ChartModal = React.forwardRef<HTMLDivElement>((_, ref) => (
  <div ref={ref} className={styles.modal}>
    <Tabs>
      <TabList>
        {Object.keys(CHART_TEMPLATES).map(chart => (
          <Tab key={chart}>{chart}</Tab>
        ))}
      </TabList>

      {Object.values(CHART_TEMPLATES).map(chart => (
        <TabPanel>
          <h2>{chart.content}</h2>
        </TabPanel>
      ))}
    </Tabs>
  </div>
));

export default ChartModal;
