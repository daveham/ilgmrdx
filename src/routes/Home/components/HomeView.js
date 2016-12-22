import React from 'react';
import debugLib from 'debug';
const debug = debugLib('app:HomeView');

import styles from './HomeView.scss';

export const HomeView = (/* props */) => {
  debug('render');
  return (
    <div className={styles.container}>
      Home Contiainer
    </div>
  );
};

export default HomeView;
