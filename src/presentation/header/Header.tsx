import React, { useRef, useState } from 'react';
import useOnClickOutside from '../../app/hooks/useOnClickOutside';

import ChartModal from './ChartModal';

import HeaderAction from './HeaderAction';
import TrashCollector from './TrashCollector';

import 'react-tabs/style/react-tabs.css';
import styles from './Header.module.css';


const Header: React.FC = () => {
  const [modalState, setModalState] = useState({
    shown: false,
  });

  const toggleModal = (value?: boolean) => setModalState(prevState => ({
    ...prevState,
    shown: value !== undefined ? value : !prevState.shown,
  }));

  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, (e: any) => {
    if (e.target.id !== 'add-chart') {
      toggleModal(false);
    }
   });

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        Dashboard!
      </div>
      <div className={styles["action-container"]}>
        <TrashCollector />

        <HeaderAction 
          id="add-chart"
          onClick={() => toggleModal()}>➕</HeaderAction>
        
        {modalState.shown && (
          <ChartModal
            ref={ref}
            toggleModalOff={() => toggleModal(false)}
          />
        )}
        <HeaderAction onClick={() => alert('Coming soon!')}>⚙️</HeaderAction>
      </div>
    </header>
  );
}

export default Header;