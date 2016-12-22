import React from 'react';
import Toolbar from 'components/Toolbar';
import Footer from 'components/Footer';
import 'styles/core.scss';

import debugLib from 'debug';
const debug = debugLib('app:CoreLayout');

export const CoreLayout = ({ children }) => {
  debug('render');
  return (
    <div className='page-container'>
      <Toolbar />
      <div className='view-container'>
        {children}
      </div>
      <Footer />
    </div>
  );
};

CoreLayout.propTypes = {
  children: React.PropTypes.element
};

export default CoreLayout;
