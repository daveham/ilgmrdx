import React from 'react';
import Socket from 'components/Socket';

import styles from './Footer.scss';

export default (props) => {
  return (
    <div className={styles.container}>
      <Socket/>
    </div>
  );
};
