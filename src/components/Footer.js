import React from 'react';
import Socket from 'components/Socket';

import styles from './Footer.scss';

const Footer = () => {
  return (
    <div className={styles.container}>
      <Socket />
    </div>
  );
};

export default Footer;
