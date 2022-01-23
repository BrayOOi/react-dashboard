import React from 'react';
import withHeader from '../../hoc/withHeader/withHeader';
import BaseDashboard from '../Dashboard/BaseDashboard';

import styles from './Home.module.css';

const Home: React.FC = () => {
  return (
    <main className={styles.home}>
      <BaseDashboard />
    </main>
  );
};

export default withHeader(Home);