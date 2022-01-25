import React from 'react';
import styles from './Header.module.css';
import HeaderAction from './HeaderAction';
import TrashCollector from './TrashCollector';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        Dashboard!
      </div>
      <div className={styles["action-container"]}>
        <TrashCollector />
        <HeaderAction>➕</HeaderAction>
        <HeaderAction>⚙️</HeaderAction>
      </div>
    </header>
  );
}

export default Header;