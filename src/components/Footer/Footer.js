import React from 'react';
import Socket from 'components/Service';
import debugLib from 'debug';
const debug = debugLib('app:Footer');

import styles from './Footer.scss';

export const Footer = () => {
  debug('render');
  return (
    <div className={styles.container}>
      <Socket/>
    </div>
  );
};

export default Footer;
