import React from 'react';

import styles from './Header.module.css';

interface HeaderActionProps {
  children: React.ReactNode;
  [key: string]: any;
}

const HeaderAction: React.FC<HeaderActionProps> = ({
  children,
  ...props
}) => (
  <span className={styles.action} {...props}>
    {children}
  </span>
);

export default HeaderAction;
