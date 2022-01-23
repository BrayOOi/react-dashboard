import React from 'react';
import styles from './Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        Dashboard!
      </div>
      <div className={styles.actions}>
      </div>
    </header>
  );
}

export default Header;