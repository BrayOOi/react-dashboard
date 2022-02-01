import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { ChartType } from '../chart/types';
import CHART_TEMPLATES from './chart-data';
import ChartModalItem from './ChartModalItem';

import styles from './Header.module.css';

const ChartModal = React.forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className={styles.modal}>
      <Tabs>
        <TabList>
          {Object.keys(CHART_TEMPLATES).map(chart => (
            <Tab key={chart}>
              <span className={styles["tab-header"]}>{chart}</span>
            </Tab>
          ))}
        </TabList>

        {Object.entries(CHART_TEMPLATES).map(([key, chart]) => (
          <TabPanel key={key + 'content'}>
            {Object.entries(chart.size).map(([size, dimensions]) => (
              <div key={key + size} className={styles["modal-section"]}>
                <span className={styles["modal-section-header"]}>{size}</span>
                <div className={styles["modal-section-chart-container"]}>
                  <ChartModalItem
                    type={key as ChartType["type"]}
                    row={dimensions![1]}
                    column={dimensions![0]}
                  />
                </div>
              </div>
            ))}
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
});

export default ChartModal;
