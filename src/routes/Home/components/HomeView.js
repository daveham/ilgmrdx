import React from 'react';
import debugLib from 'debug';
const debug = debugLib('app:HomeView');

import styles from './HomeView.scss';

export const HomeView = (/* props */) => {
  debug('HomeView');
  return (
    <div className={styles.container}>
    </div>
  );
};

export default HomeView;
