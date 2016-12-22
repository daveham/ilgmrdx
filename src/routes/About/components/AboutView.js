import React from 'react';
import debugLib from 'debug';
const debug = debugLib('app:AboutView');

import styles from './AboutView.scss';

export const AboutView = (/* props */) => {
  debug('render');
  return (
    <div className={styles.container}>
      About Contiainer
    </div>
  );
};

export default AboutView;
