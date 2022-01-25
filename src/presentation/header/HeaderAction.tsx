import React from 'react';

import styles from './Header.module.css';

interface HeaderActionProps {
  children: React.ReactNode;
}

const HeaderAction: React.FC<HeaderActionProps> = ({
  children
}) => (
  <span className={styles.action}>
    {children}
  </span>
);

export default HeaderAction;
